import {defineField, defineType} from 'sanity'
import {preview} from 'sanity-plugin-icon-picker'

export default defineType({
  name: 'icon',
  title: 'Ikona',
  type: 'object',
  options: {
    columns: 2,
  },
  icon: 'icon',
  fields: [
    defineField({
      name: 'asset',
      type: 'iconPicker',
      title: 'Wybór ikony',
      description: 'Wybierz z listy',
      options: {
        outputFormat: 'react',
        collapsed: false,
        providers: ['fa', 'fi', 'si'],
        filter: [
          'FaFacebookF',
          'FaInstagram',
          'FaLinkedinIn',
          'FaYoutube',
          'FaGithub',
          'FaBehance',
          'FaTiktok',
          'FaSnapchat',
          'FaSpotify',
          'FaDiscord',
          'FaTwitch',
          'SiX',
          'FiMapPin',
          'FiMail',
          'FiPhone',
          'FiFilm',
          'FiHeadphones',
          'FiImage',
          'FiCalendar',
          'FiCamera',
          'FiFileText',
          'FiExternalLink',
          'FiHash',
        ],
      },
    }),
    defineField({
      name: 'alt',
      title: 'Opis ikony',
      description: 'Dla dostępności i SEO',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const parent = context.parent as {asset?: unknown} | undefined
          const hasIcon = !!parent?.asset
          if (hasIcon && !alt) {
            return 'Wymagane, jeśli ikona jest ustawiona'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      icon: 'asset',
      alt: 'alt',
    },
    prepare({icon, alt}) {
      return {
        title: alt || '[Brak opisu]',
        subtitle: icon?.name || '[Brak ikony]',
        media: icon ? preview(icon) : undefined,
      }
    },
  },
})
