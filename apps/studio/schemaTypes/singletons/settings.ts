import {defineArrayMember, defineField, defineType} from 'sanity'
import {Link} from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Ustawienia',
  type: 'document',
  fields: [
    {
      name: 'footer',
      title: 'Stopka',
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
          type: 'array',
          of: [
            defineArrayMember({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
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
