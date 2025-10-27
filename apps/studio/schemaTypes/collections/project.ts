import {defineArrayMember, defineField} from 'sanity'
import {definePage} from '../helpers'
import {Clapperboard, UsersRound} from 'lucide-react'
import {uniqueByLanguage} from '../../lib/intl'

export default definePage({
  name: 'project',
  title: 'Projekt',
  icon: Clapperboard,
  fields: [
    defineField({
      name: 'name',
      title: 'Tytuł',
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
      name: 'timestamp',
      title: 'Data',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'cover',
      title: 'Obraz kafelka',
      type: 'richImage',
      group: 'content',
    }),
    defineField({
      name: 'featured',
      title: 'Główna grafika lub video',
      type: 'imgOrVideo',
      group: 'content',
      validation: (Rule) => Rule.max(1).error('Maksymalnie 1 obraz lub video'),
    }),
    defineField({
      name: 'contributors',
      title: 'Współtwórcy',
      group: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'categoryGroup',
          type: 'object',
          title: 'Kategoria',
          icon: UsersRound,
          fields: [
            defineField({
              name: 'category',
              title: 'Kategoria',
              type: 'string',
            }),
            defineField({
              name: 'people',
              title: 'Lista osób',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'subcategories',
              title: 'Podkategorie',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subcategoryGroup',
                  title: 'Podkategoria',
                  fields: [
                    defineField({
                      name: 'subCategory',
                      title: 'Podkategoria',
                      type: 'string',
                    }),
                    defineField({
                      name: 'people',
                      title: 'Lista osób',
                      type: 'array',
                      of: [{type: 'string'}],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'multimedia',
      title: 'Multimedia',
      type: 'imgOrVideo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'cover',
    },
  },
})
