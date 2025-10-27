import {Link} from 'lucide-react'
import {defineField, defineType} from 'sanity'
import {preview} from 'sanity-plugin-icon-picker'

export default defineType({
  name: 'linkIcon',
  title: 'Link',
  type: 'object',
  icon: Link,
  fields: [
    defineField({
      name: 'icon',
      title: 'Ikona',
      type: 'icon',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
      label: 'link.label',
      url: 'link.url',
    },
    prepare({icon, label, url}) {
      return {
        title: label || icon?.alt || '[Brak etykiety]',
        subtitle: url,
        media: icon?.asset ? preview(icon.asset) : Link,
      }
    },
  },
})
