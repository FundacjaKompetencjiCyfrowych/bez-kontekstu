import {PluginConfig} from '@sanity/document-internationalization'
import {StructureBuilder} from 'sanity/structure'
import {SlugValidationContext} from 'sanity'
import {capitalize} from './utils'
import {defineField} from 'sanity'
import {SANITY_CONFIG} from 'config'
const {apiVersion} = SANITY_CONFIG

/**
 * List of document types that support translations **All new translatable documents must be added here**
 */
const intlTypes = [
  'home',
  'manifest',
  'projects',
  'contact',
  'cooperators',
  'donators',
  'sounds',
  'project',
  'cooperator',
  'privacy',
  'settings',
]

const supportedLanguages = [
  {id: 'pl', title: 'Polish'},
  {id: 'en', title: 'English'},
]
const languageFieldName = 'language'

/**
 * Config for `@sanity/document-internationalization` plugin
 */
export const intlConfig: PluginConfig = {
  supportedLanguages,
  schemaTypes: intlTypes,
  languageField: languageFieldName,
}

/**
 * Structure API helper to create a list item for documents only in the specified language
 */
export const SingleLanguage = (
  S: StructureBuilder,
  options: {type: string; title?: string; lang?: string; icon?: any},
) => {
  const {type, title, icon} = options
  const lang = options.lang ?? supportedLanguages[0].id
  return S.listItem()
    .title(title || capitalize(type))
    .icon(icon)
    .child(
      S.documentTypeList(type)
        .title(title || capitalize(type))
        .apiVersion(apiVersion)
        .filter(`_type == $type && ${languageFieldName} == $lang`)
        .params({type, lang})
        .initialValueTemplates([S.initialValueTemplateItem(`${type}_${lang}`).parameters({lang})]),
    )
}

/**
 * Structure API helper to create a list item with separate tabs for documents in each language
 */
export const LanguageList = (
  S: StructureBuilder,
  options: {type: string; title?: string; plural?: string; icon?: any},
) => {
  const {type, title, plural, icon} = options
  return S.listItem()
    .title(title || capitalize(type))
    .icon(icon)
    .child(
      S.list()
        .title(`${title || capitalize(type)} by Language`)
        .items([
          S.listItem()
            .title(`All ${plural || ''}`)
            .child(
              S.documentTypeList(type)
                .title(`All ${plural || ''}`)
                .apiVersion(apiVersion)
                .filter(`_type == "${type}"`),
            ),
          ...supportedLanguages.map(({id, title}) =>
            SingleLanguage(S, {type, title: `${title} ${options.plural || ''}`, lang: id}),
          ),
        ]),
    )
}

/**
 * A function that adds appropriate templates for each language filtered list
 *
 * add to `schema.templates` in `sanity.config.ts` to override "new document" menu items for translation-enabled documents
 */
export const addLanguageTemplates = (templates: any[]) => {
  return [
    ...templates.filter(({schemaType}) => !intlTypes.includes(schemaType)),
    ...supportedLanguages.flatMap(({id: lang, title}) =>
      intlTypes.map((type) => ({
        id: `${type}_${lang}`,
        title: `${title} ${capitalize(type)}`,
        schemaType: type,
        value: {[languageFieldName]: lang},
      })),
    ),
  ]
}

/**
 * A field that stores language id, required by the internationalization plugin
 */
export const languageField = defineField({
  name: languageFieldName,
  type: 'string',
  hidden: true,
  validation: (Rule) => Rule.required(), // disable saving docs without language
})

/**
 * Slug validator that allows same unique slug in different languages
 */
export async function uniqueByLanguage(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  if (!document) {
    console.warn(`Couldn't validate slug: ${slug} document not found`)
    return false
  }
  const langauge = document[languageFieldName]
  if (!langauge) {
    console.warn(`Couldn't validate slug: ${slug} locale not found`)
    return false
  }
  const client = getClient({apiVersion})
  const id = document._id.replace(/^drafts\./, '') // also check drafts
  const query = `
    count(*[
      _type == $type &&
      slug.current == $slug &&
      ${languageFieldName} == $langauge &&
      !(_id in [$draftId, $publishedId])
    ])
  `
  const params = {
    type: document._type,
    slug,
    langauge,
    draftId: `drafts.${id}`,
    publishedId: id,
  }
  const count = await client.fetch(query, params)
  return count === 0
}
