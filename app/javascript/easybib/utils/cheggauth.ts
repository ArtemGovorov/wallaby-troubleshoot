import qs from 'qs'
import axios from 'axios'
import { fetchAndStoreUser } from 'easybib/utils/utils'
import { tagLogin, tagSignup } from 'easybib/utils/gtm'
import trackWithoutThrow from 'easybib/utils/track'
import { deleteEbUser } from 'easybib/utils/localStorage'
import environment from 'easybib/utils/environment'

export interface SuperAuth {
  defaultflow: string
  response_type: string
  data?: string
  providerurl?: string
}

export interface SuperAuthExtras {
  showSubModal: (options: {}) => void
  redirectTo: string
  showValueprop: boolean
  client: any
  ocVersion: string
}

export const appendScriptToBody = (url: string): void => {
  const scriptElement = document.createElement('script')
  scriptElement.setAttribute('src', url)
  document.body.appendChild(scriptElement)
}

export const appendElementToBody = (
  elementName: string,
  attributes: [{ name: string; value: string }]
) => {
  const element = document.createElement(elementName)
  attributes.forEach(attribute => {
    element.setAttribute(attribute.name, attribute.value)
  })
  document.body.appendChild(element)
}

const LOCAL_OR_PLAYGROUND = environment !== 'PRODUCTION'

// Chegg Auth Component Documentation:
// https://confluence.cheggnet.com/pages/viewpage.action?spaceKey=GE&title=K+-+Auth+open+component

// Chegg Auth Usage:
// https://docs.google.com/document/d/1xD0RFOjbVdDddtgHIjacAewAIt4k7cjBHcSKDtesuqE

const urlPrefix = LOCAL_OR_PLAYGROUND ? 'playground.easybib.com' : 'www.easybib.com'
const baseUrlDomain = LOCAL_OR_PLAYGROUND
  ? 'chegg-registry.test.cheggnet'
  : 'registry.chegg'
const baseUrl = `//${baseUrlDomain}.com/chegg-auth/`
const ocClientURL =
  'https://components.cheggcdn.com/components/oc-client/0.42.16/src/oc-client.min.js'

const valuepropContent = {
  header: 'EasyBib Plus subscription includes',
  bullet1: 'Automatically generated citations in APA and thousands of other styles',
  bullet2: 'Advanced grammar and plagiarism features',
  bullet3: 'Parenthetical/in-text citations and footnotes for your paper',
  footer: '$9.95 monthly. Cancel anytime.',
  bulletHexColor: '#EB7100',
  colorTheme: 'light',
}

export const getCheggAuthUrl = (
  customAuthOptions?: SuperAuth,
  opts?: SuperAuthExtras
): string => {
  const authOptions = {
    profile: 'EB',
    display: 'inline',
    defaultflow: 'signup',
    redirect_uri: `https://${urlPrefix}/auth/oauth/chegg`,
    fullpkg: 1,
    ...customAuthOptions,
  }

  const options = {
    ocVersion: '2.87.0',
    ...opts,
  }

  if (options && options.showValueprop) {
    // the data itself needs to be base64 encoded, which is what .btoa() does.
    // To be clear, btoa is a native browser javascript method available on window
    authOptions.data = window.btoa(JSON.stringify({ valueprop: valuepropContent }))
  }

  if (LOCAL_OR_PLAYGROUND) {
    authOptions.providerurl = 'https://rc.live.test.cheggnet.com/'
  }

  const parameters = qs.stringify(authOptions, { addQueryPrefix: true })

  return `${baseUrl}${options.ocVersion}${parameters}`
}

const authenticate = async (saOptions, options: SuperAuthExtras) => {
  deleteEbUser()
  try {
    await axios({
      method: 'post',
      url: '/api/auth/login',
      data: { ...saOptions, ...options },
      withCredentials: true,
    })
  } catch (error) {
    trackWithoutThrow(error)
  }

  // fetchAndStoreUser so that we make a call to the token api and can register that the user is pro
  //  and save them in localStorage before ad-vantage loads for the next page. This is required because ad-vantage
  // is loaded via header-inline.js before the next page has a change to fetch the new logged-in user
  // and verify pro status
  await fetchAndStoreUser()
  const previousPath = options.redirectTo || '/myaccount'
  window.location.assign(previousPath)
}

const cheggAuthReady = (e, auth, options: SuperAuthExtras) => {
  auth.trigger('disable redirect', true)
  auth.on('auth event', (event, data) => {
    const { eventInfo } = data
    if (eventInfo && eventInfo.type === 'signup_success') {
      tagSignup()
    } else if (eventInfo && eventInfo.type === 'signin_success') {
      tagLogin()
    }
  })
  auth.on('auth successful', (event, saOptions) => {
    authenticate(saOptions, options)
  })
}

export const loadCheggSuperAuth = ({
  superAuth,
  options,
}: {
  superAuth: SuperAuth
  options: SuperAuthExtras
}) => {
  appendElementToBody('oc-component', [
    { name: 'href', value: getCheggAuthUrl(superAuth, options) },
  ])
  appendScriptToBody(ocClientURL)

  window.oc = window.oc || {}
  window.oc.cmd = window.oc.cmd || []
  window.oc.cmd.push(oc => {
    if (window.globalCheggAuth) {
      cheggAuthReady(null, window.globalCheggAuth, options)
    } else {
      oc.events.on('chegg-auth-ready', (e, auth) => cheggAuthReady(e, auth, options))
    }
  })
}
