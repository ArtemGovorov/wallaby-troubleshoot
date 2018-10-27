const environment = require('./environment')
const SentryCliPlugin = require('@sentry/webpack-plugin')

if (process.env.TRAVIS_TAG) {
  environment.plugins.append(
    'SentryCliPlugin',
    new SentryCliPlugin({
      release: process.env.TRAVIS_TAG,
      include: '.',
      ignore: ['node_modules', 'jest', 'coverage', 'docs'],
      configFile: 'sentry.properties',
    })
  )
}

module.exports = environment.toWebpackConfig()
