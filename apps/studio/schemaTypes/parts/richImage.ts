import {defineType, defineField} from 'sanity'
import {Image} from 'lucide-react'

export default defineType({
  name: 'richImage',
  title: 'Obraz',
  type: 'image',
  icon: Image,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Tekst alternatywny',
      type: 'string',
      description: 'Opis obrazu wymagany dla dostępności i SEO',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
  },
})
