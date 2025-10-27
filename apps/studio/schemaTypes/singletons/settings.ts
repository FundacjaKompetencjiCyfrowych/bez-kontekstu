import {defineField} from 'sanity'
import {definePage} from '../helpers'

export default definePage({
  name: 'settings',
  title: 'Ustawienia',
  fields: [
    {
      name: 'footer',
      title: 'Stopka',
      group: 'content',
      type: 'object',
      fields: [
        defineField({
          name: 'links',
          title: 'Odnośniki',
          type: 'linkList',
        }),
        defineField({
          name: 'socials',
          title: 'Social media',
          type: 'linkIconList',
        }),
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Ustawienia',
      }
    },
  },
})
