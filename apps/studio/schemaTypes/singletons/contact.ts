import {defineField} from 'sanity'
import {definePage} from '../helpers'

export default definePage({
  name: 'contact',
  title: 'Kontakt',
  fields: [
    defineField({
      name: 'fields',
      title: 'Pola',
      type: 'linkIconList',
    }),
  ],
})
