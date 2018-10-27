import { FetchUserResponse } from 'easybib/utils/utils'
export interface Citation {
  formatted_data: {
    output: string
  }
  date: Date
  contributors: Contributor[]
  pubnonperiodical?: {
    start: string
    end: string
    title: string
  }
  source:
    | 'advertisement'
    | 'bible'
    | 'blog'
    | 'book'
    | 'brochure'
    | 'cartoon'
    | 'chapter'
    | 'collection'
    | 'conference'
    | 'congress'
    | 'contributor'
    | 'courtcase'
    | 'custom'
    | 'database'
    | 'dictionary'
    | 'digital'
    | 'dissertation'
    | 'dissertationabstract'
    | 'editorial'
    | 'email'
    | 'encyclopedia'
    | 'executiveorder'
    | 'fedbill'
    | 'fedreport'
    | 'fedrule'
    | 'film'
    | 'govt'
    | 'grammar'
    | 'image'
    | 'interview'
    | 'introduction'
    | 'journal'
    | 'lecture'
    | 'letter'
    | 'magazine'
    | 'mailinglist'
    | 'manuscript'
    | 'map'
    | 'microform'
    | 'miscellaneous'
    | 'multivolume'
    | 'musicalrecording'
    | 'newsgroup'
    | 'newsletter'
    | 'newspaper'
    | 'painting'
    | 'pamphlet'
    | 'patent'
    | 'performance'
    | 'photo'
    | 'press'
    | 'rawdata'
    | 'report'
    | 'review'
    | 'scholarlyproject'
    | 'software'
    | 'statute'
    | 'suffix'
    | 'testimony'
    | 'thesis'
    | 'tv'
    | 'website'
  pubtype: {
    main: string
  }
  website: {
    title: string
  }
  pubonline?: {
    title: string
  }
}

export interface EBUser extends FetchUserResponse {
  projectID: string
  exp: number
}

export interface Contributor {
  last?: string
  first?: string
  middle?: string
  suffix?: string
  function?: string
}
export interface GTMData {
  event: string
  eventCategory?: string
  eventAction?: string
  eventLabel?: string
  eventCallback?: (containerID: string) => void
  eventTimeout?: number
  validation?: 'success'
  linkLocation?: string
  styleType?: string
  sourceType?: string
  sourceStyle?: string
}

export interface EasybibClientState {
  citationCount: number
  pageCount: number
  pagesVisited: string[]
  type: string
}

export interface BackendOpts {
  cellNames?: []
  spa?: boolean
  runLoader?: boolean
}
