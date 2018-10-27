import { DataApi, FormatApi, SourceApi, TokenStorage } from 'redux-citation-api'
import isWindowDefined from 'easybib/utils/isWindowDefined'
import Config from './config'

const url = isWindowDefined
  ? `${window.location.protocol}//${window.location.hostname}:${
      window.location.port
    }/api/token`
  : 'www.easybib.com'

export const tokenStorage = new TokenStorage({
  url,
  options: {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
})

const headers = {
  'X-AlCell': isWindowDefined && window.gon ? window.gon.archieLeagueVersion : '',
}

export const dataApi = new DataApi(Config.dataUrl, tokenStorage, headers)

export const formatApi = new FormatApi(
  {
    format: { url: `${Config.apiUrl}/bulk` },
    styles: { url: '/api/styles' },
  },
  Config.apiKey,
  headers
)

const sourcePath = {
  article: Config.sourceArticleUrl,
  book: Config.sourceBookUrl,
  website: Config.sourceWebsiteUrl,
  newspaper: Config.sourceNewspaperUrl,
  journal: Config.sourceJournalUrl,
  magazine: Config.sourceMagazineUrl,
  film: Config.sourceFilmUrl,
  default: Config.sourceDefaultUrl,
}
export const sourceApi = new SourceApi(
  sourcePath,
  Config.autociteUrl,
  Config.autociteKey,
  headers
)
