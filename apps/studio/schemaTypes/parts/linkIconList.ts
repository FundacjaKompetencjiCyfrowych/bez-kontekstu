import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'linkIconList',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'link',
      title: 'Link',
      type: 'linkIcon',
    }),
  ],
})
