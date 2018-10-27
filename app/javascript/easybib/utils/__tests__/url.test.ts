import {
  urlParams,
  getCurrentPage,
  formatHomeUrl,
  formatSearchUrl,
  formatFormUrl,
  formatStyleUrl,
  stripEmail,
} from '../url'

describe('URL Param Util', () => {
  it('return an object by default', () => {
    expect(urlParams()).toEqual({ style: undefined, type: undefined })
  })

  it('should return the correct params for bibliography page', () => {
    // Override window.location.pathname
    // as https://github.com/facebook/jest/issues/890
    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: '/project/style/mla7',
    })

    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?id=1234',
    })

    const expected = { projectID: '1234', style: 'mla7' }
    expect(urlParams('bibliography')).toEqual(expected)
  })

  it('should return the correct params for the cite form page', () => {
    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: '/cite/form',
    })

    Object.defineProperty(window, 'citationFormData', {
      writable: true,
      value: {
        style: 'mla8',
        source: 'book',
      },
    })

    const expected = { type: 'book', style: 'mla8' }

    expect(urlParams('form')).toEqual(expected)
  })

  it('should return the correct params for the form page', () => {
    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: '/mla8-format/painting-citation',
    })
    const expected = { type: 'painting', style: 'mla8' }

    expect(urlParams('form')).toEqual(expected)
  })
})

describe('getCurrentPage Util', () => {
  it('should return the correct pages for the given urls', () => {
    const collection = [
      { hrefs: ['/home'], page: 'home' },
      { hrefs: ['/style', '/style/mla8/website-citation'], page: 'style' },
      { hrefs: ['/mla8/website-citation/search?q=google.com'], page: 'search' },
      { hrefs: ['/mla8/website-citation/eval'], page: 'eval' },
      {
        hrefs: ['/mla8-format/website-citation/new', '/mla8-format/website-citation/new'],
        page: 'form',
      },
      {
        hrefs: ['/project/style/mla8?id=1534267025_5b730e912ef036.03571168'],
        page: 'bibliography',
      },
      { hrefs: ['/login'], page: 'login' },
      { hrefs: ['/register'], page: 'register' },
    ]

    collection.forEach(group => {
      group.hrefs.forEach(href => {
        Object.defineProperty(window.location, 'href', {
          writable: true,
          value: href,
        })

        expect(getCurrentPage()).toEqual(group.page)
      })
    })
  })
})

describe('format url Utils', () => {
  it('should return a correct home url', () => {
    expect(formatHomeUrl()).toBe('/')
  })

  it('should return a correct search url', () => {
    expect(
      formatSearchUrl({
        citationStyle: 'mla8',
        sourceType: 'website',
        searchText: 'Harry Potter',
      })
    ).toBe('/mla8/website-citation/search?q=Harry%20Potter')
  })

  it('should return a correct form url', () => {
    expect(
      formatFormUrl({
        citationStyle: 'mla8',
        sourceType: 'website',
        projectID: '1234',
        citationID: '5678',
      })
    ).toBe('/mla8-format/website-citation/edit/1234/5678')
  })

  it('should return a correct style url', () => {
    expect(formatStyleUrl({ citationStyle: 'mla8', sourceType: 'website' })).toBe(
      '/style/mla8/website-citation'
    )
  })

  it('should strip an email address', () => {
    expect(stripEmail('http://test.com/hello@test.com?foo=bar')).toBe(
      'http://test.com/?foo=bar'
    )
  })

  it('should strip strip query strings', () => {
    expect(stripEmail('http://test.com/citation?foo=test@test.com')).toBe(
      'http://test.com/citation?foo='
    )
  })

  it('should leave a non-email untouched', () => {
    expect(stripEmail('http://test.com/hellotest.com')).toBe(
      'http://test.com/hellotest.com'
    )
  })
})
