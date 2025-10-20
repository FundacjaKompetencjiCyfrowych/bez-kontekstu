import {defineType, defineField} from 'sanity'
import {CharCountInput, CharCountTextOptions} from '../../components/CharCountInput'

export default defineType({
  name: 'meta',
  title: 'Metadane',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł strony',
      type: 'string',
      description: 'Do 60 znaków',
      options: {
        rows: 1,
        max: 60,
      } as CharCountTextOptions,
      components: {
        input: CharCountInput,
      },
      validation: (Rule) =>
        Rule.max(60).warning('Długie tytuły mogą być ucięte w wynikach wyszukiwania'),
    }),
    defineField({
      name: 'description',
      title: 'Opis strony',
      type: 'text',
      description: 'Około 150-160 znaków',
      options: {
        rows: 3,
        max: 160,
      } as CharCountTextOptions,
      components: {
        input: CharCountInput,
      },
      validation: (Rule) =>
        Rule.max(160).warning('Długie opisy mogą być ucięte w wynikach wyszukiwania'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Obraz miniatury',
      description: 'Obraz wyświetlany w wynikach wyszukiwania i social mediach',
      type: 'richImage',
    }),
  ],
})
