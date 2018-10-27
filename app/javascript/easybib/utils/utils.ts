import requestWithCredentials from 'easybib/utils/api'
import { Citation, Contributor, EBUser } from 'types/easybib'
import { setEbUser } from './localStorage'
/**
 * Sort citations based on:
 *
 * | sortKey         | prop                    | dir |
 * |-----------------|-------------------------|-----|
 * | alphabetical    | *.formatted_data.output | -1  |
 * | dateLeastRecent | *.date                  | -1  |
 * | dateMostRecent  | *.date                  |  1  |
 *
 */
export const sortCitations = (
  citations: Citation[],
  sortKey: string = 'alphabetical'
): Citation[] => {
  const allowedKeys = ['alphabetical', 'dateLeastRecent', 'dateMostRecent']
  if (!allowedKeys.includes(sortKey)) throw new Error(`Sorting key unknown: ${sortKey}`)

  const getVal = (obj: Citation, key: string) =>
    key === 'alphabetical'
      ? obj.formatted_data.output.toUpperCase().replace(/['"“]/g, '')
      : obj.date
  const getDir = (key: string) => (key === 'dateMostRecent' ? 1 : -1)

  return citations.sort((a, b) => {
    const valA = getVal(a, sortKey)
    const valB = getVal(b, sortKey)
    const dir = getDir(sortKey)

    if (valA < valB) return dir
    if (valA > valB) return -dir
    return 0
  })
}

const formatContribs = (contribs: Contributor[]) =>
  contribs
    .filter(contributor => contributor.last !== '')
    .map(contributor => contributor.last)

const addSeparator = (contributor: string, id: number, array: any[]) =>
  id === array.length - 1 ? `& ${contributor}` : contributor

export const contributorsText = (
  contributorsParam: Contributor[],
  style: string = ''
) => {
  let contributors = contributorsParam
  const chapterAuthor = contributors.find(
    contributor => contributor.function === 'section_author'
  )
  if (chapterAuthor && style === 'apa') {
    contributors = [chapterAuthor]
  }
  const separator = style.startsWith('mla') ? 'and ' : '& '
  const len = contributors.length

  if (len === 0) return ''
  if (len === 1 || len === 2) {
    return formatContribs(contributors).join(` ${separator}`)
  }
  if (style === 'apa' && len <= 5) {
    return formatContribs(contributors)
      .map(addSeparator)
      .join(', ')
  }
  return `${contributors[0].last} et al.`
}

export const citationIdentifier = (citation: Citation) => {
  if (citation.pubnonperiodical) {
    const { start = '', end = '' } = citation.pubnonperiodical
    return `${start}${start && end && '-'}${end}`
  }
  return ''
}

export const citationTitle = (citation: Citation) => {
  if (citation.source) return citation.source
  if (citation.website && citation.website.title) {
    return citation.website.title
  }
  if (citation.pubonline && citation.pubonline.title) {
    return citation.pubonline.title
  }
  if (citation.pubnonperiodical && citation.pubnonperiodical.title) {
    return citation.pubnonperiodical.title
  }
  return ''
}

export const citationYear = (citation?: Citation): string => {
  if (!citation || !citation.pubtype) return undefined
  const type = citation.pubtype.main
  return citation[type].year
}

export const typesRedirect = {
  advertisement: 'advertisement',
  blog: 'blog',
  broadcast: 'broadcast',
  brochure: 'brochure',
  cartoon: 'cartoon',
  courtcase: 'court-case',
  digitalfile: 'digital-file',
  digitalimage: 'image',
  editorial: 'editorial',
  email: 'email',
  executiveorder: 'executive-order',
  federalreport: 'federal-report',
  federalrule: 'federal-rule',
  federalstatute: 'federal-statute',
  federaltestimony: 'federal-testimony',
  interview: 'interview',
  lecture: 'lecture',
  letter: 'letter',
  mailinglist: 'mailing-list',
  manuscript: 'manuscript',
  microform: 'microform',
  miscellaneous: 'miscellaneous',
  newsgroup: 'newsgroup',
  newsletter: 'newsletter',
  online_database: 'online_database',
  painting: 'painting',
  pamphlet: 'pamphlet',
  patent: 'patent',
  performance: 'performance',
  photo: 'photo',
  pressrelease: 'press-release',
  rawdata: 'raw-data',
  report: 'report',
  reprintedwork: 'collection',
  review: 'review',
  scholarlyproject: 'scholarly-project',
  television: 'tv',
}

export const typesRedirectUrl = {
  customcitation: '/mla8-format/custom-citation',
  importcitations: '/impexport/index/status',
}

// This does the following:
// 1. Capitalizes the first letter of the string
// 2. Capitalizes every letter after a hypen
// 3. Finally strips all hypens
export const formatCitationStyle = str =>
  str.replace(/(-|^)([^-]?)/g, (_, prep, letter) => (prep && ' ') + letter.toUpperCase())

export const timeoutPromise = timeout => {
  return new Promise((resolve, reject) => {
    const wait = setTimeout(() => {
      clearTimeout(wait)
      resolve()
    }, timeout)
  })
}

export interface FetchUserResponse {
  loggedIn: boolean
  user: {
    role: string
    paidMember: boolean
    subscriptionType: string
    id: number
    first: string
    last: string
    email: string
    username: string
    encodedId: string
    affiliate?: string
  }
  oauth: {
    accessKey: string
    expiresAt: number
  }
  projectId: string
  schoolID: string | null
  coupon: string | null
  feedbackId: string
  access_token: string
}

export const fetchUser = async (): Promise<EBUser> => {
  const response = await Promise.resolve<FetchUserResponse>(
    requestWithCredentials(`/api/token`, 'get')
  )
  // set expiration time of one minute from now to refresh user
  return {
    ...response,
    projectID: response.projectId,
    exp: getCurrentTime() + 60,
  }
}

export const fetchAndStoreUser = async (): Promise<EBUser> => {
  const user = await fetchUser()
  setEbUser(user)
  return user
}

export const getCurrentTime = () => Math.round(new Date().getTime() / 1000)
