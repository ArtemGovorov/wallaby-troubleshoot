import {
  sendToGTM,
  sendToGTMPromise,
  sendToGTMLink,
  initCoreDataLayer,
  InitCoreDataLayerParams,
  getSubdomain,
} from '../gtm'

import { push } from 'easybib/utils/history'
jest.mock('easybib/utils/history', () => ({
  push: jest.fn(),
}))

beforeEach(() => {
  window.dataLayer = []
  window.google_tag_manager = false
})

describe('sendToGTM Util', () => {
  it('adds the correct data to the data layer array', () => {
    sendToGTM({ event: 'event' })
    expect(window.dataLayer).toEqual([{ event: 'event' }])
  })
  it('adds onto existing data layer if it exists', () => {
    window.dataLayer = [{ event: 'firstEvent' }]
    sendToGTM({ event: 'secondEvent' })
    expect(window.dataLayer).toEqual([{ event: 'firstEvent' }, { event: 'secondEvent' }])
  })
})

describe('sendToGTM Link', () => {
  const syntheticEventMock = {
    currentTarget: {
      href: 'easybib.com',
      getAttribute: () => 'http://easybib.com',
    },
    preventDefault: jest.fn(),
    persist: jest.fn(),
  } as any

  it('does not push to data layer if gtm is not enabled', async () => {
    const tag = sendToGTMLink({ event: 'link event' })
    await tag(syntheticEventMock)
    expect(window.dataLayer).toEqual([])
  })

  it('pushes to data layer if gtm is enabled', async () => {
    window.google_tag_manager = true
    const tag = sendToGTMLink({ event: 'link event' })
    await tag(syntheticEventMock)
    expect(window.dataLayer).toMatchObject([{ event: 'link event' }])
  })

  it('accepts optional href', async () => {
    window.google_tag_manager = true
    const tag = sendToGTMLink({ event: 'link event' })
    await tag(syntheticEventMock, { href: 'http://ezbib.com' })
    expect(window.dataLayer).toMatchObject([{ event: 'link event' }])
  })

  it('accepts optional ability to push', async () => {
    window.google_tag_manager = true
    const tag = sendToGTMLink({ event: 'link event' })
    await tag(syntheticEventMock, { enablePush: true })
    expect(push).toHaveBeenCalled()
    expect(window.dataLayer).toMatchObject([{ event: 'link event' }])
  })
})

describe('sendToGTM Promise Util', () => {
  it('adds the correct data to the data layer array', async () => {
    await sendToGTMPromise({ event: 'promise event' })
    expect(window.dataLayer).toEqual([])
    window.google_tag_manager = true
    await sendToGTMPromise({ event: 'next promise event' })
    expect(window.dataLayer).toMatchObject([{ event: 'next promise event' }])
  })
})

describe('getSubdomain', () => {
  const testCases = [
    ['easybib.com', 'www'],
    ['playground.easybib.com', 'playground'],
    ['playground.easybib.com', 'playground'],
    ['subdomain.playground.easybib.com', 'subdomain'],
  ]

  testCases.forEach(test => {
    it(`${test[0]} => ${test[1]}`, () => {
      expect(getSubdomain(test[0])).toBe(test[1])
    })
  })
})

describe('initCoreDataLayer', () => {
  let dataLayerParams: InitCoreDataLayerParams
  beforeEach(() => {
    dataLayerParams = {
      event: 'event',
      page: 'form',
      ebUser: {
        user: {
          id: 123,
          role: 'mybibpro',
          first: 'first',
          last: 'last',
          email: 'harry@chegg.com',
          username: 'harry@chegg',
          encodedId: 'econdedId',
          paidMember: true,
          subscriptionType: 'subscriptionType',
        },
        loggedIn: true,
        schoolID: 'schoolId',
        coupon: 'coupon',
        projectId: 'projectId',
        projectID: 'projectID',
        feedbackId: 'feedbackId',
        exp: 1234,
        oauth: {
          accessKey: 'accessKey',
          expiresAt: 12345,
        },
        access_token: 'access_token',
      },
      release: 'theRelease',
      hostname: 'www.easybib.com',
    }
  })
  it('should send the right data', () => {
    initCoreDataLayer(dataLayerParams)
    expect(window.dataLayer).toEqual([
      {
        release: 'theRelease',
        event: 'event',
        subdomain: 'www',
        userID: null,
        loggedIn: 'yes',
        paidMember: 'yes',
        role: 'mybibpro',
        schoolID: 'schoolId',
        coupon: 'coupon',
        affiliate: null,
        adVantagePage: 'form',
        redesignPage: 'redesign',
        subscriptionType: 'subscriptionType',
        pageGroup: 'core citation flow',
        pageSubGroup: 'citation form',
      },
    ])
  })

  it('should handle an empty user', () => {
    dataLayerParams.ebUser.user = null
    initCoreDataLayer(dataLayerParams)
  })
})
