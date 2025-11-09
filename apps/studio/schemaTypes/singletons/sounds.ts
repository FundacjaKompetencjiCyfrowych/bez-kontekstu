import {defineArrayMember, defineField} from 'sanity'
import {definePage} from '../helpers'

export default definePage({
  name: 'sounds',
  title: 'Dźwięki',
  fields: [
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
