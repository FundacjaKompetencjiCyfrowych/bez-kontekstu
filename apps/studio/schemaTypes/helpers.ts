import {languageField} from '../lib/intl'
import {defineField, defineType, DocumentDefinition} from 'sanity'

export const definePage = (options: Omit<DocumentDefinition, 'type'>) => {
  const {fields, name, title, preview, icon, groups} = options
  return defineType({
    name,
    title,
    type: 'document',
    icon,
    groups: groups ?? [
      {
        name: 'seo',
        title: 'SEO',
      },
      {
        name: 'content',
        title: 'Content',
      },
    ],
    fields: [
      languageField,
      defineField({
        name: 'meta',
        title: 'Metadane',
        type: 'meta',
        group: 'seo',
      }),
      ...fields,
    ],
    preview: preview ?? {
      select: {
        title: 'meta.title',
      },
    },
  })
}
