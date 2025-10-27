import {defineArrayMember, defineField} from 'sanity'
import {definePage} from '../helpers'

export default definePage({
  name: 'home',
  title: 'Strona główna',
  fields: [
    defineField({
      name: 'manifest',
      title: 'Manifest',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'body',
          title: 'Treść',
          type: 'blockContent',
        }),
        defineField({
          name: 'button',
          title: 'Przycisk',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projekty',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'featured',
          title: 'Wyróżnione',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'project',
              title: 'Projekt',
              type: 'reference',
              to: [{type: 'project'}],
            }),
          ],
        }),
        defineField({
          name: 'button',
          title: 'Przycisk',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'cooperators',
      title: 'Współprace',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'featured',
          title: 'Wyróżnione',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'cooperator',
              title: 'Współpraca',
              type: 'reference',
              to: [{type: 'cooperator'}],
            }),
          ],
        }),
        defineField({
          name: 'button',
          title: 'Przycisk',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'support',
      title: 'Dla darczyńców',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'body',
          title: 'Treść',
          type: 'blockContent',
        }),
        defineField({
          name: 'button',
          title: 'Przycisk',
          type: 'link',
        }),
      ],
    }),
  ],
})
