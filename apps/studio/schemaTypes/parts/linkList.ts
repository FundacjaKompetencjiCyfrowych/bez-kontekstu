import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'linkList',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
})
