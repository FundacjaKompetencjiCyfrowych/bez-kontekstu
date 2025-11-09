import {definePage} from '../helpers'

export default definePage({
  name: 'privacy',
  title: 'Polityka Prywatności',
  fields: [
    {
      name: 'content',
      title: 'Treść',
      description:
        'Treść powinna zawierać tylko jeden nagłówek H1 i zachować hierarchię nagłówków.',
      type: 'blockContentWithHeadings',
    },
  ],
})
