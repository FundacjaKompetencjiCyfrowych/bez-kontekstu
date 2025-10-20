import {Link} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: Link,
  fields: [
    defineField({
      name: 'url',
      title: 'Adres URL',
      type: 'urlOrPath',
    }),
    defineField({
      name: 'label',
      title: 'Tekst',
      type: 'string',
    }),
    defineField({
      name: 'newTab',
      title: 'Otwieraj w nowej karcie',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
