import {defineArrayMember, defineField} from 'sanity'
import {definePage} from '../helpers'
import {uniqueByLanguage} from '../../lib/intl'

export default definePage({
  name: 'sounds',
  title: `Beats'n Pieces`,
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
      // hidden: true,
      options: {
        source: 'name',
        isUnique: uniqueByLanguage,
      },
    }),
    defineField({
      name: 'timestamp',
      title: 'Data',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'cover',
      title: 'Obraz kafelka',
      type: 'richImage',
      group: 'content',
    }),
    defineField({
      name: 'trackUrls',
      title: 'Linki do dzwieków',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'url',
          title: 'Adres URL',
          type: 'url',
        }),
      ],
    }),
  ],
})
