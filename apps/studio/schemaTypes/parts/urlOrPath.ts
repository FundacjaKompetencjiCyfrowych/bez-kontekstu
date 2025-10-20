import {Link} from 'lucide-react'
import {defineType} from 'sanity'

export default defineType({
  name: 'urlOrPath',
  title: 'Adres URL',
  icon: Link,
  type: 'string',
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true // allow empty
      const isRelative = value.startsWith('/')
      const isAbsolute = /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value)
      if (!isRelative && !isAbsolute) {
        return 'Adres musi zaczynać się od "/" lub "http(s)://"'
      }
      if (/\s/.test(value)) return 'Adres nie może zawierać spacji'
      return true
    }),
})
