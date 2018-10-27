import { cslToEB, diffData } from '../AutociteUtils'

const testCsl = {
  data: {
    results: [
      {
        csl: {
          type: 'webpage',
          title: 'Google',
          'title-short': 'Google',
          publisher: 'Google',
          'publisher-place': '',
          issued: {
            'date-parts': [['2018', '04', '17']],
          },
          accessed: {
            'date-parts': [['2018', '04', '17']],
          },
          'container-title': 'Google',
          URL: 'http://www.google.com/',
          author: [{ given: 'Sergey', family: 'Brin' }],
        },
        feedback: {
          rule: 'GoogleCom',
          ruleVersion: '1.0.0',
          url: 'http://www.google.com/',
          host: 'www.google.com',
        },
      },
    ],
  },
}

const finalCitation = {
  data: {
    autocite: { url: 'http://www.google.com/' },
    contributors: [{ first: 'Sergey', function: 'author', last: 'Brin' }],
    pubonline: {
      day: '17',
      dayaccessed: '17',
      inst: 'Google',
      month: 'april',
      monthaccessed: 'april',
      title: 'Google',
      url: 'http://www.google.com/',
      year: '2018',
      yearaccessed: '2018',
    },
    source: 'webpage',
    website: { title: 'Google' },
  },
  display: { page_title: 'Google' },
  feedback: {
    host: 'www.google.com',
    rule: 'GoogleCom',
    ruleVersion: '1.0.0',
    url: 'http://www.google.com/',
  },
}

let expectedFeedbackData

describe('Autocite Utils', () => {
  beforeEach(() => {
    expectedFeedbackData = {
      score: 0,
      institutionChanged: 0,
      institutionAdded: 0,
      institutionRemoved: 0,
      institutionUsed: 100,
      mediumTitleChanged: 0,
      mediumTitleAdded: 0,
      mediumTitleRemoved: 0,
      mediumTitleUsed: 100,
      contentTitleChanged: 0,
      contentTitleAdded: 0,
      contentTitleRemoved: 0,
      contentTitleUsed: 100,
      contributorsChanged: 0,
      contributorsAdded: 0,
      contributorsRemoved: 0,
      contributorsUsed: 100,
      contributorAdded: 0,
      contributorRemoved: 0,
      publishedDayChanged: 0,
      publishedDayAdded: 0,
      publishedDayRemoved: 0,
      publishedDayUsed: 100,
      publishedMonthChanged: 0,
      publishedMonthAdded: 0,
      publishedMonthRemoved: 0,
      publishedMonthUsed: 100,
      publishedYearChanged: 0,
      publishedYearAdded: 0,
      publishedYearRemoved: 0,
      publishedYearUsed: 100,
      sourceTypeUsed: 100,
    }
  })
  it('properly converts csl', () => {
    const convertedCsl = cslToEB(testCsl)[0]
    expect(convertedCsl.data.contributors[0].first).toBe('Sergey')
    expect(convertedCsl.data.contributors[0].last).toBe('Brin')
    expect(convertedCsl.data.contributors[0].function).toBe('author')
    expect(convertedCsl.data.pubonline.day).toBe('17')
    expect(convertedCsl.data.pubonline.dayaccessed).toBe('17')
    expect(convertedCsl.data.pubonline.inst).toBe('Google')
    expect(convertedCsl.data.pubonline.month).toBe('april')
    expect(convertedCsl.data.pubonline.monthaccessed).toBe('april')
    expect(convertedCsl.data.pubonline.title).toBe('Google')
    expect(convertedCsl.data.pubonline.url).toBe('http://www.google.com/')
    expect(convertedCsl.data.pubonline.yearaccessed).toBe('2018')
    expect(convertedCsl.data.pubonline.year).toBe('2018')
    expect(convertedCsl.data.source).toBe('webpage')
    expect(convertedCsl.data.website.title).toBe('Google')
    expect(convertedCsl.display.page_title).toBe('Google')
  })

  it('properly handles an object that has no results', () => {
    const emptyResults = { data: { results: [] } }
    expect(cslToEB(emptyResults).length).toBe(0)
  })

  it('returns the proper feedback data if no changes are made to the citation', () => {
    const diffedData = diffData(finalCitation.data, cslToEB(testCsl)[0].data)
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if content title changes', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.website.title = 'changedtitle'
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      contentTitleChanged: 100,
      contentTitleUsed: 0,
      contentTitle: 'changedtitle',
      score: 20,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if medium title changes', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.pubonline.title = 'changedtitle'
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      mediumTitleChanged: 100,
      mediumTitleUsed: 0,
      mediumTitle: 'changedtitle',
      score: 20,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if institution changes', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.pubonline.inst = 'changedinst'
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      institutionChanged: 100,
      institutionUsed: 0,
      institution: 'changedinst',
      score: 20,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if contributors change', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.contributors[0].first = 'Larry'
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      contributorsChanged: 100,
      contributorsUsed: 0,
      contributors: [{ first: 'Larry', function: 'author', last: 'Brin' }],
      score: 20,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if a contributor is added', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.contributors.push({ first: 'Larry' })
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      contributorsChanged: 100,
      contributorAdded: 100,
      contributorsUsed: 0,
      contributors: [
        { first: 'Sergey', function: 'author', last: 'Brin' },
        { first: 'Larry' },
      ],
      score: 20,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if the only contributor is removed', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.contributors.shift()
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      contributorsRemoved: 100,
      contributorsUsed: 0,
      contributors: [],
      score: 20,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if year changes', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.pubonline.year = '1989'
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      publishedYearUsed: 0,
      publishedYearChanged: 100,
      publishedYear: '1989',
      score: 10,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if month changes', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.pubonline.month = 'November'
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      publishedMonthUsed: 0,
      publishedMonthChanged: 100,
      publishedMonth: 'November',
      score: 5,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })

  it('returns the proper feedback data if day changes', () => {
    const changedCitation = JSON.parse(JSON.stringify(finalCitation.data))
    changedCitation.pubonline.day = '4'
    const diffedData = diffData(changedCitation, cslToEB(testCsl)[0].data)
    expectedFeedbackData = {
      ...expectedFeedbackData,
      publishedDayUsed: 0,
      publishedDayChanged: 100,
      publishedDay: '4',
      score: 5,
    }
    expect(diffedData).toEqual(expectedFeedbackData)
  })
})
