import {
  CROSSREF_CITATION_URL,
  WORLDCAT_CITATION_URL,
  HIGHBEAM_CITATION_URL,
} from 'easybib/constants'

const Config = {
  easybibEnvironment: process.env.EASYBIB_ENVIRONMENT || 'playground',
  environment: process.env.NODE_ENV || 'development',
  autociteKey: process.env.AUTO_CITE_KEY || '12345',
  apiKey: process.env.CITATION_API_KEY || '67890',
  apiUrl:
    process.env.CITATION_API_URL || 'https://api.playground.citation-api.com/2.1/rest',
  autociteUrl: process.env.AUTOCITE_URL || 'https://autocite.playground.citation-api.com',
  autociteFeedbackUrl:
    process.env.AUTOCITE_FEEDBACK_URL ||
    'https://autocite-data-playground.citation-api.com:8889/',
  cmsApiUrl:
    process.env.CMS_API_URI || 'https://playground.easybib.com/integrationapi/cms',
  dataUrl: process.env.DATA_URL || 'https://data.playground.easybib.com',
  easybibLegacyUrl: process.env.EASYBIB_LEGACY_URL || 'http://playground.easybib.com',
  ravenURI: process.env.RAVEN_URI,
  sourceWebsiteUrl: process.env.SOURCE_WEBSITE_URL || 'https://web.citation-api.com',
  sourceArticleUrl: CROSSREF_CITATION_URL,
  sourceBookUrl: WORLDCAT_CITATION_URL,
  sourceNewspaperUrl: HIGHBEAM_CITATION_URL,
  sourceJournalUrl: CROSSREF_CITATION_URL,
  sourceMagazineUrl: HIGHBEAM_CITATION_URL,
  sourceFilmUrl: WORLDCAT_CITATION_URL,
  sourceDefaultUrl: WORLDCAT_CITATION_URL,
}

export default Config
