import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SANITY_CONFIG} from 'config'
import {filterSingletonTemplates, singletonDocumentActions} from './lib/singleton'
import {documentInternationalization} from '@sanity/document-internationalization'
import {intlConfig, addLanguageTemplates} from './lib/intl'
import {structure} from './lib/structure'
import {combineTemplates} from './lib/utils'
import {iconPicker} from 'sanity-plugin-icon-picker'

const {projectId, dataset} = SANITY_CONFIG

export default defineConfig({
  name: 'default',
  title: 'Bez Kontekstu',

  projectId,
  dataset,

  plugins: [
    structureTool(structure),
    visionTool(),
    documentInternationalization(intlConfig),
    iconPicker(),
  ],

  schema: {
    types: schemaTypes,
    templates: combineTemplates(filterSingletonTemplates, addLanguageTemplates),
  },

  document: {
    actions: singletonDocumentActions,
  },
})
