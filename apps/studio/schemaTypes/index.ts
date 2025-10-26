import blockContent from './parts/blockContent'
import richImage from './parts/richImage'
import meta from './parts/meta'
import urlOrPath from './parts/urlOrPath'
import link from './parts/link'
import linklist from './parts/linkList'
import imgOrVideo from './parts/imgOrVideo'
import linkIcon from './parts/linkIcon'
import linkIconList from './parts/linkIconList'
import icon from './parts/icon'

import home from './singletons/home'
import manifest from './singletons/manifest'
import projects from './singletons/projects'
import contact from './singletons/contact'
import cooperators from './singletons/cooperators'
import donators from './singletons/donators'
import sounds from './singletons/sounds'
import privacy from './singletons/privacy'
import settings from './singletons/settings'

import cooperator from './collections/cooperator'
import project from './collections/project'

export const schemaTypes = [
  blockContent,
  richImage,
  meta,
  home,
  manifest,
  projects,
  contact,
  cooperators,
  donators,
  sounds,
  cooperator,
  project,
  privacy,
  urlOrPath,
  settings,
  link,
  linklist,
  imgOrVideo,
  linkIcon,
  linkIconList,
  icon,
]

// Singleton and translatable documents must be added to `lib/singleton` and/or `lib/intl`
