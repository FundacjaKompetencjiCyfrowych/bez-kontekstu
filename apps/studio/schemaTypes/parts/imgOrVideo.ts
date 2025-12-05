import {Film} from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'imgOrVideo',
  title: 'Obraz lub video URL',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Obraz',
      type: 'richImage',
    }),
    defineArrayMember({
      name: 'video',
      title: 'Video URL',
      type: 'object',
      icon: Film,
      fields: [
        defineField({
          name: 'url',
          title: 'Adres URL',
          type: 'urlOrPath',
        }),
      ],
    }),
  ],
})
