import chokidar from 'chokidar'
import {ChildProcess, spawn} from 'child_process'
import debounce from 'lodash.debounce'
import path from 'path'
import fs from 'fs'
import emojiStrip from 'emoji-strip'
import {SANITY_CONFIG} from 'config'

// get watcher paths
const studioPath = path.resolve(__dirname, '../')
const rootPath = path.resolve(__dirname, '../../../')
const configPath = path.resolve(rootPath, 'packages/config')
const queriesPath = path.resolve(rootPath, SANITY_CONFIG.queries)
const typesPath = path.resolve(rootPath, SANITY_CONFIG.types)
const schemaTypesPath = path.join(studioPath, 'schemaTypes')

// check if paths exist
if (!fs.existsSync(schemaTypesPath)) {
  throw new Error(`Missing schema types directory: ${schemaTypesPath}`)
}
if (!fs.existsSync(queriesPath)) {
  throw new Error(`Missing queries file: ${queriesPath}`)
}

console.log('> Starting type generation watcher')

// Watch config and regenerate sanity-config.json

type TypegenConfig = {
  path: string
  schema: string
  generates: string
}

const toPosix = (str: string) => str.replace(/\\/g, '/')

const genTypegenConfig = () => {
  console.log('- Regenerating sanity-typegen.json')
  const config: TypegenConfig = {
    schema: 'schema.json',
    path: toPosix(path.relative(studioPath, queriesPath)) || '**/*.{ts,tsx,js,jsx}',
    generates: toPosix(path.relative(studioPath, typesPath)) || 'typegen.ts',
  }
  try {
    fs.writeFileSync(
      path.resolve(__dirname, '../sanity-typegen.json'),
      JSON.stringify(config, null, 2),
    )
    console.log('✓ Generated sanity-typegen.json')
  } catch (err) {
    console.error('X Failed to generate sanity-typegen.json:', err)
  }
}

genTypegenConfig()

const debouncedGenTypegenConfig = debounce(genTypegenConfig, 200)

const configWatcher = chokidar.watch([configPath], {ignoreInitial: true})

configWatcher.on('all', (event) => {
  if (['add', 'change', 'unlink'].includes(event)) {
    debouncedGenTypegenConfig()
  }
})

console.log(`👁 Watching: ${configPath}`)

// Watch schemaTypes and queries and regenerate types

let running = false
let pending = false
let pendingSchema = true
let typegenProc: ChildProcess | null = null

function handleClose(code: number) {
  running = false
  if (code !== 0) {
    console.error(`X Command failed with code ${code}`)
  }

  if (pending) {
    pending = false
    console.log('> Files changed during generation, re-running...')
    runTypegen()
  } else {
    pendingSchema = false
  }
}

function handleError(err: Error) {
  console.error('X Process error:', err)
  running = false
}

function handleData(data: Buffer) {
  const safe = emojiStrip(data.toString())
  process.stdout.write(safe)
}

async function runTypegen() {
  if (running) {
    pending = true
    return
  }

  running = true

  const script = pendingSchema
    ? 'sanity schema extract && sanity typegen generate'
    : 'sanity typegen generate'

  console.log(`> Running: ${script}`)

  typegenProc = spawn(script, {
    stdio: ['inherit', 'pipe', 'pipe'],
    cwd: path.dirname(__dirname),
    shell: true,
  })

  typegenProc.stdout?.on('data', handleData)
  typegenProc.stderr?.on('data', handleData)
  typegenProc.on('close', handleClose)
  typegenProc.on('error', handleError)
}

const debouncedRunTypegen = debounce(runTypegen, 200)

const typegenWatcher = chokidar.watch([schemaTypesPath, queriesPath], {
  ignoreInitial: true,
})

typegenWatcher.on('all', (event, filePath) => {
  if (['add', 'change', 'unlink'].includes(event)) {
    console.log(`👁 ${event}: ${path.relative(process.cwd(), filePath)}`)
    if (filePath.startsWith(schemaTypesPath)) {
      pendingSchema = true
    }
    debouncedRunTypegen()
  }
})

console.log(`👁 Watching: ${schemaTypesPath}`)
console.log(`👁 Watching: ${queriesPath}`)

// Run
runTypegen()

// Handle shutdown
const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT']

const shutdown = async () => {
  console.log('\n⏹ Shutting down...')
  if (typegenProc) typegenProc.kill()
  await typegenWatcher.close()
  await configWatcher.close()
  console.log('✓ Shut down')
  process.exit(0)
}

signals.forEach((signal) => {
  process.on(signal, shutdown)
})
