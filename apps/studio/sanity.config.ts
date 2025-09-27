import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SANITY_CONFIG} from 'config'
import {filterSingletonTemplates, singletonDocumentActions} from './singleton'

const {projectId, dataset} = SANITY_CONFIG

export default defineConfig({
  name: 'default',
  title: 'Bez Kontekstu',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.divider().title('Posts'),
            S.documentTypeListItem('post'),
            S.documentTypeListItem('author'),
            S.documentTypeListItem('category'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: filterSingletonTemplates,
  },

  document: {
    actions: singletonDocumentActions,
  },
})
