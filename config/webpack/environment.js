const { environment } = require('@rails/webpacker')

// Allows node to read .env file
require('dotenv').config()

const keys = [
  'AUTO_CITE_KEY',
  'AUTOCITE_URL',
  'AUTOCITE_FEEDBACK_URL',
  'CITATION_API_KEY',
  'CITATION_API_URL',
  'DATA_URL',
  'EASYBIB_LEGACY_URL',
  'HIDE_ADS',
  'EASYBIB_ENVIRONMENT',

  'GTM_ID',
  'GTM_AUTH',
  'GTM_PREVIEW',

  // Adds release tag for GTM
  'TRAVIS_TAG',
]

// TODO: process.env.SITE isn't really a thing, but maybe it should be
const SITE = (process.env.SITE || 'easybib').toUpperCase()

Object.assign(process.env, {
  GTM_ID: process.env[`${SITE}_GTM_ID`],
  GTM_AUTH: process.env[`${SITE}_GTM_AUTH`],
  GTM_PREVIEW: process.env[`${SITE}_GTM_PREVIEW`],
})

// Set up default keys
keys.forEach(key => {
  environment.plugins.get('Environment').keys.push(key)
  environment.plugins.get('Environment').defaultValues[key] = process.env[key]
})

environment.loaders.prepend('tests', {
  test: /\.test\.(js|jsx|ts|tsx)\.snap$/,
  use: 'null-loader',
})

// ignore markdown files
environment.loaders.append('markdown', {
  test: /\.md$/,
  use: 'null-loader',
})

environment.loaders.append('typescript', {
  test: /\.(ts|tsx)$/,
  use: [
    {
      loader: 'ts-loader',
    },
  ],
})

const babelLoader = environment.loaders.get('babel')
/*
* Adding an npm module name to the `babelLoader.exclude` regex
*   allows this module to be linked via `yarn link`.
*   Adding this to git history should have no effect on
*   any environment. When the module is not symlinked 
*   it is already within the `node_modules` directory.
*   If symlinked (and the true path is outside `node_modules`),
*   adding the name bypasses transpilation for this module, 
*   and we also bypass productivity killing compilation errors. 
*/
babelLoader.exclude = /(node_modules|subscription-frontend)/

module.exports = environment
