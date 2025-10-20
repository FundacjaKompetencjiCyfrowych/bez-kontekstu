import {defineField} from 'sanity'
import {definePage} from '../helpers'
import {Clapperboard, UserRound} from 'lucide-react'
import {uniqueByLanguage} from '../../lib/intl'

export default definePage({
  name: 'cooperator',
  title: 'Współpraca',
  icon: UserRound,
  fields: [
    defineField({
      name: 'name',
      title: 'Imię',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'name',
        isUnique: uniqueByLanguage,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Obraz',
      type: 'richImage',
      group: 'content',
    }),
    defineField({
      name: 'socials',
      title: 'Social media',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projekty',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'project',
          title: 'Projekt',
          type: 'string',
          icon: Clapperboard,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image.asset',
    },
  },
})
