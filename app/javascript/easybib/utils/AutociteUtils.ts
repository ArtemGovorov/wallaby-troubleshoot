import axios from 'axios'
import { v4 } from 'uuid'
import Config from 'easybib/config'
import { trackWithoutThrow } from 'easybib/utils/track'

const deepEql = require('deep-eql')

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const formattedAutociteSource = (source: string) =>
  source === 'webpage' ? 'website' : source
const formatContribs = (type: string, cslData) =>
  cslData[type]
    ? cslData[type].map(contrib => ({
        last: contrib.family,
        first: contrib.given,
        function: type,
      }))
    : []
const formattedContribs = cslData =>
  formatContribs('author', cslData).concat(
    formatContribs('editor', cslData),
    formatContribs('translator', cslData)
  )

export const cslToEB = cslObj => {
  if (!Array.isArray(cslObj.data.results) || cslObj.data.results.length === 0) return []
  const cslData = cslObj.data.results[0].csl
  const dateAccessed = cslData.accessed['date-parts'][0]
  const dateIssued = cslData.issued['date-parts'][0]
  return [
    {
      data: {
        pubonline: {
          yearaccessed: dateAccessed[0] || '',
          monthaccessed: dateAccessed[1] ? months[dateAccessed[1] - 1] : '',
          dayaccessed: dateAccessed[2] || '',
          url: cslData.URL,
          title: cslData['container-title'],
          inst: cslData.publisher,
          day: dateIssued[2] || '',
          month: dateIssued[1] ? months[dateIssued[1] - 1] : '',
          year: dateIssued[0] || '',
        },
        [formattedAutociteSource(cslData.type)]: {
          title: cslData.title,
        },
        contributors: formattedContribs(cslData),
        source: cslData.type,
        autocite: {
          url: cslData.URL,
        },
      },
      display: {
        page_title: cslData.title,
      },
      feedback: cslObj.data.results[0].feedback,
    },
  ]
}

export const autociteUrl = (url: string) =>
  axios.get(`${Config.autociteUrl}/api/v3/query`, {
    params: { url },
    withCredentials: true,
    headers: {
      Accept: 'application/vnd.com.easybib.data+json',
      Authorization: `Bearer ${Config.autociteKey}`,
      Pragma: 'no-cache',
    },
  })

export const sendMetrics = (cslResponse, page: string, user) => {
  if (
    cslResponse &&
    cslResponse.data &&
    cslResponse.data.results &&
    cslResponse.data.results[0]
  ) {
    try {
      axios.post(
        Config.autociteFeedbackUrl,
        { ...cslResponse.data.results[0].metrics, clientPage: page },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            NameSpace: 'autocite.metrics',
            Accept: 'application/json',
          },
        }
      )
    } catch (e) {
      trackWithoutThrow(e, user, { level: 'warning' })
    }
  }
}

const fixContributors = data => {
  // eslint-disable-next-line no-param-reassign
  data.contributors = [
    { function: 'author', first: '', middle: '', last: '', suffix: '' },
  ]
}

/**
 * Get an object value providing its nested key as string
 */
/* eslint-disable */
const nestedValue = (str: string, arr: any[]) => {
  if (!str.includes('.')) return arr[str]
  return str.split('.').reduce((a, b) => a[b], arr)
}
/* eslint-enable */

const keysToCheck = (source: string) => [
  { key: 'institution', nestedKey: 'pubonline.inst', score: 20 },
  { key: 'mediumTitle', nestedKey: 'pubonline.title', score: 20 },
  { key: 'contentTitle', nestedKey: `${source}.title`, score: 20 },
  { key: 'publishedDay', nestedKey: 'pubonline.day', score: 5 },
  { key: 'publishedMonth', nestedKey: 'pubonline.month', score: 5 },
  { key: 'publishedYear', nestedKey: 'pubonline.year', score: 10 },
  { key: 'sourceType', nestedKey: 'source', score: 0 },
]

const checkForChange = ({ initVal, submitVal, feedbackData, prop }) => {
  if (!initVal) {
    feedbackData[`${prop}Added`] = 100
  } else if (!submitVal) {
    feedbackData[`${prop}Removed`] = 100
  } else feedbackData[`${prop}Changed`] = 100
}

// check the final citation to see if the user changed any of the information given from autocite
export const diffData = (citationData, autociteData) => {
  const feedbackData = {
    score: 0,
    institutionChanged: 0,
    institutionAdded: 0,
    institutionRemoved: 0,
    institutionUsed: 0,
    mediumTitleChanged: 0,
    mediumTitleAdded: 0,
    mediumTitleRemoved: 0,
    mediumTitleUsed: 0,
    contentTitleChanged: 0,
    contentTitleAdded: 0,
    contentTitleRemoved: 0,
    contentTitleUsed: 0,
    contributorsChanged: 0,
    contributorsAdded: 0,
    contributorsRemoved: 0,
    contributorsUsed: 0,
    contributorAdded: 0,
    contributorRemoved: 0,
    publishedDayChanged: 0,
    publishedDayAdded: 0,
    publishedDayRemoved: 0,
    publishedDayUsed: 0,
    publishedMonthChanged: 0,
    publishedMonthAdded: 0,
    publishedMonthRemoved: 0,
    publishedMonthUsed: 0,
    publishedYearChanged: 0,
    publishedYearAdded: 0,
    publishedYearRemoved: 0,
    publishedYearUsed: 0,
  } as any
  const keys = keysToCheck(formattedAutociteSource(autociteData.source))
  keys.forEach(k => {
    const initVal = nestedValue(k.nestedKey, autociteData)
    const submitVal = nestedValue(k.nestedKey, citationData)

    if (initVal !== submitVal) {
      feedbackData[k.key] = submitVal
      feedbackData.score += k.score
      checkForChange({ initVal, submitVal, feedbackData, prop: k.key })
    } else if (initVal) {
      feedbackData[`${k.key}Used`] = 100
    }
  })
  const originalAutociteContributorsLength = autociteData.contributors.length
  if (autociteData.contributors.length === 0) fixContributors(autociteData)

  if (!deepEql(citationData.contributors, autociteData.contributors)) {
    feedbackData.score += 20
    feedbackData.contributors = citationData.contributors
    feedbackData.contributorsChanged = 100
    if (citationData.contributors.length === 0) {
      feedbackData.contributorsRemoved = 100
      feedbackData.contributorsChanged = 0
    } else if (originalAutociteContributorsLength === 0) {
      feedbackData.contributorsAdded = 100
      feedbackData.contributorsChanged = 0
    } else if (citationData.contributors.length > originalAutociteContributorsLength) {
      feedbackData.contributorAdded = 100
    } else if (citationData.contributors.length < originalAutociteContributorsLength) {
      feedbackData.contributorRemoved = 100
    }
  } else if (originalAutociteContributorsLength) {
    feedbackData.contributorsUsed = 100
  }

  if (citationData.annotation && citationData.annotation.text) {
    feedbackData.annotation = citationData.annotation.text
  }

  return feedbackData
}

export const sendAutociteFeedback = async (citationData, autociteData, user) => {
  const feedbackData = diffData(citationData, autociteData.data)
  feedbackData.uuid = v4()
  feedbackData.app = 'easybib.com'
  feedbackData.clientVersion = window.gon ? window.gon.archieLeagueVersion : ''
  try {
    await axios.post(
      Config.autociteFeedbackUrl,
      { ...feedbackData, ...autociteData.feedback },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          NameSpace: 'autocite.feedback',
          Accept: 'application/json',
        },
      }
    )
  } catch (e) {
    trackWithoutThrow(e, user)
  }
}
