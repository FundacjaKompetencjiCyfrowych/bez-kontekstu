// sanity/singleton.ts
import {StructureBuilder} from 'sanity/structure'

export const singletonTypes = new Set(['homepage', 'aboutPage', 'helpCenterPage', 'helpUsPage'])

export const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

/**
 * Helper to filter out singleton document actions
 *
 * add to `document.actions` in `sanity.config.ts` to limit singleton document actions
 */
export const singletonDocumentActions = (input: any[], context: any) =>
  singletonTypes.has(context.schemaType)
    ? input.filter(({action}) => action && singletonActions.has(action))
    : input

/**
 * Helper to filter out singleton templates
 *
 * add to `schema.templates` in `sanity.config.ts` to disable "new document" menu for singletons
 */
export const filterSingletonTemplates = (templates: any[]) =>
  templates.filter(({schemaType}) => !singletonTypes.has(schemaType))

/**
 * Helper to create a singleton list item
 *
 * Example: `S.list().items([singletonItem(S, 'homepage')])`
 */
export const singletonItem = (S: StructureBuilder, type: string, title?: string) =>
  S.listItem()
    .title(title || capitalize(type))
    .id(type)
    .child(S.document().schemaType(type).documentId(type))

function capitalize(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
}
