import {intl} from '../lib/intl'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import home from './home'

export const schemaTypes = intl([blockContent, category, post, author, home])

// Singleton and translatable documents must be added to `lib/singleton` and/or `lib/intl`
