import {PluginConfig} from '@sanity/document-internationalization'
import {StructureBuilder} from 'sanity/structure'
import {capitalize} from './utils'
import {defineField} from 'sanity'

/**
 * List of document types that support translations **All new translatable documents must be added here**
 */
const intlTypes = ['home', 'post', 'author']

const supportedLanguages = [
  {id: 'pl', title: 'Polish'},
  {id: 'en', title: 'English'},
]
const languageField = 'language'

/**
 * Config for `@sanity/document-internationalization` plugin
 */
export const intlConfig: PluginConfig = {
  supportedLanguages,
  schemaTypes: intlTypes,
  languageField,
}

/**
 * Structure API helper to create a list item for documents only in the specified language
 */
export const SingleLanguage = (
  S: StructureBuilder,
  type: string,
  title?: string,
  lang = supportedLanguages[0].id,
) =>
  S.listItem()
    .title(title || capitalize(type))
    .child(
      S.documentTypeList(type)
        .title(title || capitalize(type))
        .filter(`_type == $type && ${languageField} == $lang`)
        .params({type, lang})
        .initialValueTemplates([S.initialValueTemplateItem(`${type}_${lang}`).parameters({lang})]),
    )

/**
 * Structure API helper to create a list item with separate tabs for documents in each language
 */
export const LanguageSelection = (
  S: StructureBuilder,
  type: string,
  title?: string,
  plural?: string,
) =>
  S.listItem()
    .title(title || capitalize(type))
    .child(
      S.list()
        .title(`${title || capitalize(type)} by Language`)
        .items([
          S.listItem()
            .title(`All ${plural || ''}`)
            .child(
              S.documentTypeList(type)
                .title(`All ${plural || ''}`)
                .filter(`_type == "${type}"`),
            ),
          ...supportedLanguages.map(({id, title}) =>
            SingleLanguage(S, type, `${title} ${plural || ''}`, id),
          ),
        ]),
    )

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
        value: {[languageField]: lang},
      })),
    ),
  ]
}

/**
 * A field that stores language id, required by the internationalization plugin
 */
const languageSchemaField = defineField({
  name: languageField,
  type: 'string',
  hidden: true,
  validation: (Rule) => Rule.required(), // disable saving docs without language
})

/**
 * A function that adds a language field to appropriate document types
 *
 * wrap `schemaTypes` to enable translations
 */
export const intl = (schemaTypes: any[]) => {
  return schemaTypes.map((schemaType) => {
    if (intlTypes.includes(schemaType.name)) {
      return {
        ...schemaType,
        fields: [...schemaType.fields, languageSchemaField],
      }
    } else {
      return schemaType
    }
  })
}
