import {StructureToolOptions} from 'sanity/structure'
import {Singleton} from './singleton'
import {SingleLanguage as Collection} from './intl'
import {
  House,
  Clapperboard,
  HandCoins,
  Mail,
  ScrollText,
  Volume2,
  UsersRound,
  Shield,
  Wrench,
} from 'lucide-react'

/**
 * Structure of the Sanity Studio
 */
export const structure: StructureToolOptions = {
  structure: (S) =>
    S.list()
      .id('content')
      .title('Content')
      .items([
        S.divider().title('Strony'),
        Singleton(S, {type: 'home', title: 'Strona główna', icon: House}),
        Singleton(S, {type: 'manifest', title: 'Manifest', icon: ScrollText}),
        Singleton(S, {type: 'projects', title: 'Projekty', icon: Clapperboard}),
        Singleton(S, {type: 'contact', title: 'Kontakt', icon: Mail}),
        Singleton(S, {type: 'cooperators', title: 'Współprace', icon: UsersRound}),
        Singleton(S, {type: 'donators', title: 'Dla darczyńców', icon: HandCoins}),
        Singleton(S, {type: 'sounds', title: "Beats'n Pieces", icon: Volume2}),
        Singleton(S, {type: 'privacy', title: 'Polityka Prywatności', icon: Shield}),
        S.divider().title('Kolekcje'),
        Collection(S, {type: 'project', title: 'Projekty', icon: Clapperboard}),
        Collection(S, {type: 'cooperator', title: 'Współprace', icon: UsersRound}),
        S.divider().title('Ustawienia'),
        Singleton(S, {type: 'settings', title: 'Ustawienia', icon: Wrench}),
      ]),
}
