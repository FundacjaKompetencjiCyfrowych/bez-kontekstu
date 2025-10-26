import {Link} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: Link,
  fields: [
    defineField({
      name: 'label',
      title: 'Tekst',
      type: 'text',
      rows: 1,
    }),
    defineField({
      name: 'url',
      title: 'Adres URL',
      type: 'urlOrPath',
    }),
    defineField({
      name: 'newTab',
      title: 'Otwieraj w nowej karcie',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      url: 'url',
      label: 'label',
    },
    prepare({url, label}) {
      return {
        title: label || url,
        subtitle: url,
      }
    },
  },
})
