import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'linkIconList',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'linkIcon',
      title: 'Link',
      type: 'linkIcon',
    }),
  ],
})
