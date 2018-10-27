import qs from 'qs'
import isWindowDefined from './isWindowDefined'

/**
 * Removes '-citation' from type eg. 'website-citation' => 'website'
 * @param {string} urlParam - Url Param
 */
const formatUrlSourceType = (urlParam: string) =>
  urlParam && urlParam.replace(/-citation$/, '')

const VALID_POSSIBLY_URL_ENCODED_EMAIL_REGEX = /[\w+\-.]+(@|%40)[a-z\d\-.]+\.[a-z]+/i
export const stripEmail = (url: string): string => {
  if (VALID_POSSIBLY_URL_ENCODED_EMAIL_REGEX.test(url)) {
    return url.replace(VALID_POSSIBLY_URL_ENCODED_EMAIL_REGEX, '')
  }
  return url
}

export const getParameterByName = (name: string, queryString?: string) => {
  const currentQS = queryString || window.location.search
  const parsedUrl = qs.parse(currentQS, { ignoreQueryPrefix: true })
  return parsedUrl[name] || ''
}

const getUrlParam = (index: number): string => {
  if (!isWindowDefined) return undefined
  return window.location.pathname.split('/')[index]
}

export const urlParams = (page?: string): { [urlParam: string]: string } => {
  switch (page) {
    case 'bibliography':
      return {
        style: getUrlParam(3),
        projectID: getParameterByName('id'),
      }
    case 'form': {
      const citeFormMap = () => ({
        style: window.citationFormData.style,
        type: window.citationFormData.source,
      })

      const otherFormMap = () => ({
        style: getUrlParam(1) && getUrlParam(1).replace('-format', ''),
        type: formatUrlSourceType(getUrlParam(2)),
        citationID: getUrlParam(3) === 'edit' ? getUrlParam(5) : undefined,
      })
      return window.location.pathname === '/cite/form' ? citeFormMap() : otherFormMap()
    }
    case 'style':
      return {
        style: getUrlParam(2),
        type: formatUrlSourceType(getUrlParam(3)),
      }
    case 'home':
      return {
        style: null,
        type: null,
      }
    default:
      return {
        style: getUrlParam(1),
        type: formatUrlSourceType(getUrlParam(2)),
      }
  }
}

export const getCurrentPage = (): string | null => {
  const { href } = document.location
  if (href.includes('/project')) return 'bibliography'
  if (href.includes('/style')) return 'style'
  if (href.includes('/search')) return 'search'
  if (href.includes('/eval')) return 'eval'
  if (document.location.pathname === '/' || href.includes('/home')) return 'home'
  if (href.includes('/upgrade')) return 'upgrade'
  if (href.includes('/login')) return 'login'
  if (href.includes('/logout')) return 'logout'
  if (href.includes('/register')) return 'register'
  return 'form'
}

export const redirect = (url: string) => {
  window.location.href = url
}

export const redirectToHomePage = () => {
  redirect('/home')
}

export const getFormAPIUrl = (): string => {
  let fetchUrl = `/api/${window.gon.style}/${window.gon.type}-citation/`
  if (window.location.href.includes('/edit/')) {
    const { citationID, projectID } = urlParams('form')
    fetchUrl += 'edit'
    fetchUrl += `/${projectID}/${citationID}`
  } else {
    fetchUrl += window.location.href.includes('/new/') ? 'new' : 'manual'
  }
  fetchUrl += `?_=${new Date().getTime()}`
  return fetchUrl
}

export const isManualForm = () =>
  isWindowDefined &&
  !window.location.pathname.includes('/edit/') &&
  !window.location.pathname.includes('/new')

export const formatHomeUrl = () => '/'

export const formatSearchUrl = ({ citationStyle, sourceType, searchText }) =>
  `/${citationStyle}/${sourceType}-citation/search?q=${encodeURIComponent(
    stripEmail(searchText)
  )}`

export const formatFormUrl = ({
  citationStyle,
  sourceType,
  newOrManual = '',
  projectID,
  citationID,
}) => {
  const newOrManualPath = newOrManual ? `/${newOrManual}` : ''
  const projectAndCitationPath = projectID ? `/edit/${projectID}/${citationID}` : ''
  return `/${citationStyle}-format/${sourceType}-citation${newOrManualPath}${projectAndCitationPath}`
}

export const formatStyleUrl = ({ citationStyle, sourceType }) =>
  `/style${citationStyle ? `/${citationStyle}/${sourceType}-citation` : ''}`
