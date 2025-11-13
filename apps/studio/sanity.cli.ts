import {defineCliConfig} from 'sanity/cli'
import {SANITY_CONFIG} from 'config'

const {projectId, dataset, autoUpdates} = SANITY_CONFIG

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: 'hrozmwpnuyk0izezw2g2107m',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates,
  },
})
