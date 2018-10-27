import { push } from 'easybib/utils/history'
import isWindowDefined from 'easybib/utils/isWindowDefined'
import { SyntheticEvent } from 'react'
import { GTMData, EBUser } from 'types/easybib'

export const sendToGTM = (data: GTMData): void => {
  if (isWindowDefined) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      ...data,
    })
  }
}

export const sendToGTMPromise = (data: GTMData): Promise<void> => {
  if (isWindowDefined) {
    if (window.google_tag_manager) {
      sendToGTM({
        ...data,
        eventCallback: containerID => {
          // There can be containers other than ours on the site.
          // eventCallback is fired for *each* container, causing
          // the code inside to execute multiple times
          // unnecessarily. We check for our ID so that we fire this
          // only once, only when our container receives the necessary
          // data
          const ourContainerID = '123456'
          if (containerID === ourContainerID) {
            return Promise.resolve()
          }
        },
        eventTimeout: 2000,
      })
    } else {
      return Promise.resolve()
    }
  }
}

export const sendToGTMLink = (data: GTMData) => async (
  e: SyntheticEvent,
  options: { enablePush?: boolean; href?: string } = {}
): Promise<void> => {
  if (isWindowDefined) {
    if (window.google_tag_manager) {
      e.preventDefault()

      // This is necessary so that React holds onto a reference
      // of the event, otherwise it blows it away.
      e.persist()

      const selectedHref = options.href || e.currentTarget.getAttribute('href')

      await sendToGTMPromise(data)

      if (options.enablePush) {
        push(selectedHref)
      } else {
        window.location.href = selectedHref
      }
    }
  }
}

const intentToSubEvent = (label: string, eventCategory?: string): GTMData => ({
  event: 'event',
  eventCategory: eventCategory || 'subscription conversion flow',
  eventAction: 'intent to subscribe',
  eventLabel: label,
})

export const intentToSubCTA = sendToGTMLink(intentToSubEvent('homepage image cta'))

export const intentToSubAds = sendToGTMLink(intentToSubEvent('upgrade to remove ads'))

const paperChecker = (label: string, action: string = 'enter flow'): GTMData => ({
  event: 'event',
  eventCategory: 'paperchecker funnel',
  eventAction: action,
  eventLabel: label,
})
export const tagCtaSSSP = sendToGTMLink(paperChecker('SSSP link'))
export const tagCtaFeature = sendToGTMLink(paperChecker('homepage cta - feature tour'))
export const tagCtaMain = sendToGTMLink(paperChecker('homepage cta - main widget'))
export const tagCtaValue = sendToGTMLink(paperChecker('homepage cta - value table'))
export const tagCtaLogout = sendToGTMLink(paperChecker('logout page'))
export const tagCtaViewCTA = sendToGTMLink(paperChecker('view page cta'))
export const tagCtaNavLink = sendToGTMLink(paperChecker('nav text link'))
export const tagCtaLegacy = sendToGTMLink(
  paperChecker('create citations with legacy', 'did not enter flow')
)
export const tagNavUpgrade = sendToGTMLink(
  intentToSubEvent('upgrade to easybib plus', 'left menu')
)
export const tagMenuUpgrade = sendToGTMLink(
  intentToSubEvent('upgrade to easybib plus', 'right menu')
)
export const tagCtaGrammar = sendToGTMLink(paperChecker('grammar citation link'))
export const tagCtaPlagiarism = sendToGTMLink(paperChecker('plagiarism citation link'))

export const tagNavSignup = async () => {
  await sendToGTMPromise({
    event: 'event',
    eventCategory: 'all-nav',
    eventAction: 'signup',
    eventLabel: 'signup',
  })
}

export const tagLogin = () => {
  sendToGTM({
    event: 'email-login',
    validation: 'success',
  })
}

export const tagSignup = () => {
  sendToGTM({
    event: 'email-signup',
    linkLocation: 'superauth component',
    validation: 'success',
  })
}

export const styleEvent = (style: string) => {
  sendToGTM({
    event: 'event',
    eventCategory: 'citation creation flow',
    eventAction: 'select style type',
    eventLabel: style,
    styleType: style,
  })
}

export const copyAllEvent = () => {
  sendToGTM({
    event: 'event',
    eventCategory: 'bibliography module',
    eventAction: 'copy all',
    eventLabel: 'copy all',
  })
}

export const bibStyleEvent = (style: string) => {
  sendToGTM({
    event: 'event',
    eventCategory: 'bibliography module',
    eventAction: 'select style type',
    eventLabel: style,
    styleType: style,
  })
}

export const manualEvent = (style: string, type: string) => {
  sendToGTM({
    event: 'event',
    eventCategory: 'citation creation flow',
    eventAction: 'manual cite',
    eventLabel: 'search widget',
    styleType: style,
    sourceType: type,
  })
}

export const formEventCreate = (style: string, type: string, success: string) => {
  sendToGTM({
    event: 'event',
    eventCategory: 'citation creation flow',
    eventLabel: success,
    eventAction: 'create citation',
    styleType: style,
    sourceType: type,
  })
}

export const formEventViaDispatch = (style: string, type: string) => {
  sendToGTM({
    event: 'event',
    eventCategory: 'citation creation flow',
    eventLabel: 'success',
    eventAction: 'createCitation',
    styleType: style,
    sourceType: type,
  })
}

export const formEventUpdate = async (
  style: string,
  type: string,
  success: string,
  callback?: () => void
) => {
  await sendToGTMPromise({
    event: 'event',
    eventCategory: 'citation creation flow',
    eventLabel: success,
    eventAction: 'update citation',
    styleType: style,
    sourceType: type,
  })
  if (callback) {
    callback()
  }
}

export const searchEvent = async (style: string, type: string) => {
  await sendToGTMPromise({
    event: 'event',
    eventCategory: 'citation creation flow',
    eventAction: 'execute search',
    sourceStyle: style,
    sourceType: type,
  })
}

export const sortCitationsEvent = (sortCitationsKey: string) => {
  const sortEvents = {
    dateLeastRecent: 'Least recent',
    dateMostRecent: 'Most recent',
    alphabetical: 'Alphabetical',
  }

  sendToGTM({
    event: 'event',
    eventCategory: 'bibliography module',
    eventAction: 'sort',
    eventLabel: sortEvents[sortCitationsKey],
  })
}
export const bibliographyEvent = (action: string, value: string) => ({
  event: 'event',
  eventCategory: 'bibliography module',
  eventAction: action,
  eventLabel: value,
})

export const sendSaveEvent = sendToGTMLink(bibliographyEvent('save', 'save'))
export const sendMoreEvent = () => {
  sendToGTM(bibliographyEvent('more', 'more'))
}
export const sendIntextEvent = () => {
  sendToGTM(bibliographyEvent('intext', 'in-text citation'))
}

export const sendShowCommentsEvent = () => {
  sendToGTM(bibliographyEvent('comment', 'comment'))
}

export const getSubdomain = (hostname: string) => {
  const segments = hostname.split('.')
  const subdomain = segments.length < 3 ? 'www' : segments[0]
  return subdomain
}

const getPageTitle = (page: string) => {
  const pageTitleMap = {
    search: 'citation search results',
    webeval: 'citation evaluation review',
    form: 'citation form',
    view: 'bibliography',
    homepage: 'homepage',
  }
  return pageTitleMap[page] || page
}

export interface InitCoreDataLayerParams {
  event: string
  page: string
  ebUser: EBUser
  release: string
  hostname: string
}

export const initCoreDataLayer = ({
  event,
  page,
  ebUser,
  release,
  hostname,
}: InitCoreDataLayerParams) => {
  interface GTMCoreData extends GTMData {
    release: string
    subdomain: string
    userID: string | null
    loggedIn: string
    paidMember: string
    role: string
    schoolID: string | null
    coupon: string | null
    affiliate: string | null
    adVantagePage: string
    redesignPage: string
    subscriptionType: string | null
    pageGroup: string
    pageSubGroup: string
  }
  const data: GTMCoreData = {
    release,
    event,
    subdomain: getSubdomain(hostname),
    userID: null,
    loggedIn: ebUser.loggedIn ? 'yes' : 'no',
    paidMember: ebUser.user && ebUser.user.role === 'mybibpro' ? 'yes' : 'no',
    role: (ebUser.user && ebUser.user.role) || 'not_logged_in',
    schoolID: ebUser.schoolID || null,
    coupon: ebUser.coupon || null,
    affiliate: null,
    adVantagePage: page,
    redesignPage: 'redesign',
    subscriptionType: (ebUser.user && ebUser.user.subscriptionType) || null,
    pageGroup: 'core citation flow',
    pageSubGroup: getPageTitle(page),
  }
  sendToGTM(data)
}
