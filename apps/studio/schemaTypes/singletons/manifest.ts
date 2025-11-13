import {defineField} from 'sanity'
import {definePage} from '../helpers'
import {Heading} from 'lucide-react'

export default definePage({
  name: 'manifest',
  title: 'Manifest',
  fields: [
    defineField({
      name: 'hero',
      title: 'Start',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'quote',
          title: 'Cytat',
          type: 'blockContent',
        }),
        defineField({
          name: 'image',
          title: 'Obraz',
          type: 'richImage',
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sekcje',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'section',
          title: 'Sekcja',
          type: 'object',
          fields: [
            defineField({
              name: 'style',
              title: 'Styl',
              type: 'object',
              fields: [
                defineField({
                  name: 'desktop',
                  title: 'Dekstop',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Do lewej', value: 'left'},
                      {title: 'Do prawej', value: 'right'},
                      {title: 'Wyśrodkowane', value: 'center'},
                    ],
                    layout: 'dropdown',
                  },
                }),
                defineField({
                  name: 'tablet',
                  title: 'Tablet',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Do lewej', value: 'left'},
                      {title: 'Do prawej', value: 'right'},
                      {title: 'Wyśrodkowane', value: 'center'},
                      {title: 'Fuzja', value: 'fusion'},
                      {title: 'Wąskie do lewej', value: 'narrowLeft'},
                      {title: 'Wąskie do prawej', value: 'narrowRight'},
                    ],
                    layout: 'dropdown',
                  },
                }),
                defineField({
                  name: 'mobile',
                  title: 'Mobile',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Do lewej', value: 'left'},
                      {title: 'Do prawej', value: 'right'},
                      {title: 'Wyśrodkowane', value: 'center'},
                      {title: 'Fuzja', value: 'fusion'},
                    ],
                    layout: 'dropdown',
                  },
                }),
              ],
            }),
            defineField({
              name: 'title',
              title: 'Tytuł',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Treść',
              type: 'blockContent',
            }),
            defineField({
              name: 'feature',
              title: 'Wyróżnienie',
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Obraz',
                  type: 'richImage',
                }),
                defineField({
                  name: 'altTitle',
                  description: 'Zastępuje tytuł',
                  title: 'Alternatywny Tytuł',
                  type: 'text',
                  rows: 2,
                }),
              ],
              validation: (Rule) =>
                Rule.custom((value) => {
                  if (!value) return true
                  const hasImage = !!value.image
                  const hasSubtitle = !!value.subtitle
                  if (hasImage && hasSubtitle) {
                    return 'Można wypełnić tylko jedno pole: Obraz lub Alternatywny Tytuł'
                  }
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'feature.image',
              altTitle: 'feature.altTitle',
            },
            prepare(selection) {
              const {title, media, altTitle} = selection
              return {
                title: title,
                media: media ? media : altTitle ? Heading : undefined,
              }
            },
          },
        }),
      ],
    }),
  ],
})
