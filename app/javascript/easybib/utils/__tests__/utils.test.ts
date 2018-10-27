import {
  CURL_ERROR,
  REQUIRED_URL_ERROR,
  URL_EMPTY_ERROR,
  URL_NORESULTS_ERROR,
  WORLDCAT_URL,
} from 'easybib/constants'
import { Citation } from 'types/easybib'

import {
  citationTitle,
  citationYear,
  contributorsText,
  sortCitations,
  formatCitationStyle,
  fetchAndStoreUser,
  getCurrentTime,
} from '../utils'

import requestWithCredentials from 'easybib/utils/api'

jest.mock('easybib/utils/api')

describe('utils', () => {
  describe('formatCitationStyle', () => {
    it('formats lower case hyphenated strings', () => {
      // You're expected to handle special versions
      // like the below yourself
      expect(formatCitationStyle('')).toBe('')
      expect(formatCitationStyle('foo')).toBe('Foo')
      expect(formatCitationStyle('FOO')).toBe('FOO')
      expect(formatCitationStyle('foo-bar-baz')).toBe('Foo Bar Baz')
    })
  })

  describe('contributorsText properly formats', () => {
    it('without contributors', () => {
      const contribs = []
      const data = contributorsText(contribs)
      expect(data).toBe('')
    })

    const twoContribs = [{ first: 'John', last: 'Doe' }, { first: 'Don', last: 'Joe' }]

    it('with two contributors in mla', () => {
      const data = contributorsText(twoContribs, 'mla8')
      expect(data).toBe('Doe and Joe')
    })

    it('with two contributors in apa', () => {
      const data = contributorsText(twoContribs, 'apa')
      expect(data).toBe('Doe & Joe')
    })

    it('with one contributor', () => {
      const contribs = [{ first: 'John', last: 'Doe' }]
      const data = contributorsText(contribs)
      expect(data).toBe('Doe')
    })

    const threeContribs = [
      { first: 'John', last: 'Doe' },
      { first: 'Adam', last: 'Scott' },
      { first: 'Fiona', last: 'Apple' },
    ]

    it('with three contributors in mla', () => {
      const data = contributorsText(threeContribs, 'mla8')
      expect(data).toBe('Doe et al.')
    })

    it('with three contributors in apa', () => {
      const data = contributorsText(threeContribs, 'apa')
      expect(data).toBe('Doe, Scott, & Apple')
    })

    it('with six contributors in apa', () => {
      const contribs = [
        { first: 'John', last: 'Doe' },
        { first: 'Adam', last: 'Scott' },
        { first: 'Fiona', last: 'Apple' },
        { first: 'Jane', last: 'Austen' },
        { first: 'Jane', last: 'Eyre' },
        { first: 'Harry', last: 'Potter' },
      ]
      const data = contributorsText(contribs, 'apa')
      expect(data).toBe('Doe et al.')
    })
  })

  describe('citationTitle', () => {
    it('for citation.pubnonperiodical.title', () => {
      const citation = {
        pubnonperiodical: { title: 'Pubnonperiodical Title' },
      } as Citation
      const data = citationTitle(citation)
      expect(data).toEqual(citation.pubnonperiodical.title)
    })

    it('for citation.pubonline.title', () => {
      const citation = {
        pubnonperiodical: { title: 'Pubnonperiodical Title' },
        pubonline: { title: 'Pubonline Title' },
      } as Citation
      const data = citationTitle(citation)
      expect(data).toEqual(citation.pubonline.title)
    })

    it('for citation.website.title', () => {
      const citation = {
        pubnonperiodical: { title: 'Pubnonperiodical Title' },
        pubonline: { title: 'Pubonline Title' },
        website: { title: 'Website Title' },
      } as Citation
      const data = citationTitle(citation)
      expect(data).toEqual(citation.website.title)
    })

    it('for citation.source', () => {
      const citation = ({
        pubnonperiodical: { title: 'Pubnonperiodical Title' },
        pubonline: { title: 'Pubonline Title' },
        website: { title: 'Website Title' },
        pubtype: { main: { title: 'Pubtype Main Title' } },
        source: 'Source Title',
      } as any) as Citation
      const data = citationTitle(citation)
      expect(data).toEqual(citation.source)
    })
  })

  describe('citationYear', () => {
    it('with no citation', () => {
      const data = citationYear()
      expect(data).toBe(undefined)
    })

    it('without citation.pubtype', () => {
      const citation = {} as Citation
      const data = citationYear(citation)
      expect(data).toBe(undefined)
    })

    it('returns correct year', () => {
      const citation = ({
        pubtype: { main: 'pubonline' },
        pubonline: { year: 1666 },
        pubother: { year: 999 },
      } as any) as Citation
      const data = citationYear(citation)
      expect(data).toEqual(citation[citation.pubtype.main].year)
    })
  })

  describe('sortCitations', () => {
    const citations = ([
      {
        date: '2017-12-18 12:00:00',
        source: 'book',
        formatted_data: { output: 'Alabama' },
      },
      {
        date: '2016-12-18 12:00:00',
        source: 'journal',
        formatted_data: { output: 'Cassoulet' },
      },
      {
        date: '2015-12-18 12:00:00',
        source: 'website',
        formatted_data: { output: 'Bikini' },
      },
      {
        date: '2014-12-18 12:00:00',
        source: 'other',
        formatted_data: { output: '"Quote" me' },
      },
      {
        date: '2013-12-18 12:00:00',
        source: 'database',
        formatted_data: { output: '“Weird char“' },
      },
    ] as any) as Citation[]

    it('alphabetically', () => {
      const data = sortCitations(citations, 'alphabetical')
      expect(data[0].formatted_data.output).toEqual('Alabama')
      expect(data[1].formatted_data.output).toEqual('Bikini')
      expect(data[2].formatted_data.output).toEqual('Cassoulet')
      expect(data[3].formatted_data.output).toEqual('"Quote" me')
      expect(data[4].formatted_data.output).toEqual('“Weird char“')
    })

    it('date least recent', () => {
      const data = sortCitations(citations, 'dateLeastRecent')
      expect(data[0].date).toEqual('2013-12-18 12:00:00')
      expect(data[1].date).toEqual('2014-12-18 12:00:00')
      expect(data[2].date).toEqual('2015-12-18 12:00:00')
      expect(data[3].date).toEqual('2016-12-18 12:00:00')
      expect(data[4].date).toEqual('2017-12-18 12:00:00')
    })

    it('date most recent', () => {
      const data = sortCitations(citations, 'dateMostRecent')
      expect(data[0].date).toEqual('2017-12-18 12:00:00')
      expect(data[1].date).toEqual('2016-12-18 12:00:00')
      expect(data[2].date).toEqual('2015-12-18 12:00:00')
      expect(data[3].date).toEqual('2014-12-18 12:00:00')
      expect(data[4].date).toEqual('2013-12-18 12:00:00')
    })

    it('wrong key', () => {
      const sortError = () => sortCitations(citations, 'oops')
      expect(sortError).toThrowError('Sorting key unknown: oops')
    })
  })

  describe('fetchAndStoreUser', () => {
    it('should fetch and store user', () => {
      const userObject = {
        projectId: '123',
      }
      const x = jest.fn()
      const credentialMock = requestWithCredentials as jest.Mock
      credentialMock.mockReturnValue(Promise.resolve(userObject))
      return fetchAndStoreUser().then(result => {
        expect(result.projectID).toEqual(userObject.projectId)
        expect(result.exp).toBeGreaterThan(getCurrentTime())
      })
    })
  })
})
