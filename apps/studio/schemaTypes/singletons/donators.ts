import {defineArrayMember, defineField} from 'sanity'
import {definePage} from '../helpers'

export default definePage({
  name: 'donators',
  title: 'Darczyńcy',
  fields: [
    defineField({
      name: 'hero',
      title: 'Tytuł strony',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Sekcje',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'section',
          title: 'Sekcja',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Obraz',
              type: 'richImage',
            }),
            defineField({
              name: 'body',
              title: 'Treść',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'subsection',
                  title: 'Podsekcja',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'heading',
                      title: 'Nagłówek',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'title',
                          title: 'Tytuł',
                          type: 'string',
                        }),
                        defineField({
                          name: 'subtitle',
                          title: 'Podtytuł',
                          type: 'string',
                        }),
                      ],
                    }),
                    defineField({
                      name: 'fields',
                      title: 'Pola',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          name: 'field',
                          title: 'Pole',
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'title',
                              title: 'Tytuł',
                              type: 'string',
                            }),
                            defineField({
                              name: 'text',
                              title: 'Treść',
                              type: 'string',
                            }),
                            defineField({
                              name: 'enableCopy',
                              title: 'Kopiowanie',
                              initialValue: true,
                              description: 'Włącz kopiowanie do schowka',
                              type: 'boolean',
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'title',
                              subtitle: 'text',
                            },
                            prepare({title, subtitle}) {
                              return {
                                title: title || 'Bez tytułu',
                                subtitle: subtitle || '',
                              }
                            },
                          },
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'heading.title',
                      subtitle: 'heading.subtitle',
                    },
                    prepare({title, subtitle}) {
                      return {
                        title: title || 'Podsekcja',
                        subtitle: subtitle || '',
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              media: 'image',
            },
            prepare({media}) {
              return {
                title: 'Sekcja',
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
})
