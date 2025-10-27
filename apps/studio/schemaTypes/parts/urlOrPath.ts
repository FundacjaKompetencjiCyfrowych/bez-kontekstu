import {Link} from 'lucide-react'
import {defineType} from 'sanity'

export default defineType({
  name: 'urlOrPath',
  title: 'Adres URL',
  icon: Link,
  type: 'string',
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true
      if (value === '/') return true
      const isRelative = value.startsWith('/')
      const isMailto = value.startsWith('mailto:')
      const isTel = value.startsWith('tel:')
      const isAbsolute = /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value)
      if (!isRelative && !isAbsolute && !isMailto && !isTel) {
        return 'Adres musi zaczynać się od "/", "http(s)://", "mailto:" lub "tel:"'
      }
      if (/\s/.test(value)) return 'Adres nie może zawierać spacji'
      return true
    }),
})
