import {StructureToolOptions} from 'sanity/structure'
import {Singleton} from './singleton'
import {LanguageSelection, SingleLanguage} from './intl'

/**
 * Structure of the Sanity Studio
 */
export const structure: StructureToolOptions = {
  structure: (S) =>
    S.list()
      .title('Content')
      .items([
        S.divider().title('Pages'),
        Singleton(S, 'home'),
        S.divider().title('Posts'),
        LanguageSelection(S, 'post', 'Post', 'Posts'),
        SingleLanguage(S, 'author'),
        // S.documentTypeListItem('post'),
        // S.documentTypeListItem('author'),
        S.documentTypeListItem('category'),
      ]),
}
