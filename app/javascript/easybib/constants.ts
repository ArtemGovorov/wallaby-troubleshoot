// App related constants
export const PROJECT_NAME = 'My Citation List'
export const POPULAR_SOURCE_TYPES = [
  { id: 1, name: 'Website', value: 'website' },
  { id: 2, name: 'Book', value: 'book' },
  { id: 3, name: 'Journal', value: 'journal' },
  { id: 4, name: 'Newspaper', value: 'newspaper' },
  { id: 5, name: 'Film/Online Video', value: 'film' },
  { id: 6, name: 'Online Database', value: 'online_database' },
]

export const POPULAR_STYLES = [
  { name: 'MLA 8', value: 'mla8' },
  { name: 'MLA 7', value: 'mla7' },
  { name: 'APA', value: 'apa' },
  { name: 'Chicago', value: 'chicagob' },
]

// Display errors
export const CREATE_PROJECT_ERROR = 'Bibliography could not be created'
export const GET_PROJECT_ERROR = 'This bibliography could not be loaded'
export const UPDATE_PROJECT_ERROR = 'There was a problem updating your bibliography'
export const ADD_CITATION_ERROR = 'There was a problem adding your citation'
export const SAVE_CITATION_ERROR = 'There was a problem trying to save the citation'
export const GET_CITATION_ERROR = 'The citation could not be loaded'
export const GET_CITATIONS_ERROR = 'Citations could not be loaded'
export const CITATIONS_COUNT_ERROR =
  'There was a problem retrieving your project. Please log out and log back in.'
export const CITATION_FROM_URL_ERROR = 'The website you are trying to cite is unreachable'
export const REQUIRED_URL_ERROR = 'For website citations, a URL is required'
export const URL_NORESULTS_ERROR = 'This URL did not return any results'
export const GET_FOOTNOTE_ERROR = 'There was a problem preparing your footnote'

// URLs
export const APA_URL =
  'http://content.easybib.com/citation-guides/apa-format/how-to-cite-a-parenthetical-citations-apa/'
export const JSTOR_URL = 'https://jstor.citation-api.com/query?source=journal'
export const MLA_URL =
  'http://content.easybib.com/citation-guides/mla-format/how-to-cite-a-parenthetical-citations-mla/'
export const PROQUEST_URL = 'https://proquest.citation-api.com/query?source=journal'
export const PRICING_PATH = '/upgrade'
export const WORLDCAT_URL = 'http://worldcat.org/oclc'
export const WORLDCAT_CITATION_URL = 'https://worldcat.citation-api.com'
export const CROSSREF_CITATION_URL = 'https://crossref.citation-api.com'
export const HIGHBEAM_CITATION_URL = 'https://highbeam.citation-api.com'

// autocite request errors
export const URL_EMPTY_ERROR = 'URL parameter cannot be empty.'
export const CURL_ERROR = 'Curl error: Could not resolve'

// EBR API
export const HOME_API_ERROR = 'There was a problem loading the home page'

// JWT
export const JWT_LOCALSTOARAGE_KEY = 'jwtToken'

// Rio Pipeline
export const SITE_ID = 'eb'
export const APP_ID = 'citations'
export const PROPERTY_NAME = 'easybib'
