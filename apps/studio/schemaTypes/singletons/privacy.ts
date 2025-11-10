import {definePage} from '../helpers'

export default definePage({
  name: 'privacy',
  title: 'Polityka Prywatności',
  fields: [
    {
      name: 'content',
      title: 'Treść',
      description: 'Treść powinna zachować hierarchię nagłówków.',
      type: 'blockContentWithHeadings',
    },
  ],
})
