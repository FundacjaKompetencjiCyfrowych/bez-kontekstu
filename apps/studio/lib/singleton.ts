import {type StructureBuilder} from 'sanity/structure'
import {capitalize} from './utils'

/**
 * List of singleton document types; **All new singleton documents must be added here**
 */
export const singletonTypes = new Set([
  'home',
  'manifest',
  'projects',
  'contact',
  'cooperators',
  'donators',
  'sounds',
  'privacy',
  'settings',
])

/**
 * List of actions available on singleton documents
 */
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
 * Structure API helper to create a singleton list item
 */
export const Singleton = (
  S: StructureBuilder,
  options: {type: string; title?: string; icon?: any},
) =>
  S.listItem()
    .title(options.title || capitalize(options.type))
    .id(options.type)
    .child(S.document().schemaType(options.type).documentId(options.type))
    .icon(options.icon)
