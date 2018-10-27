import isWindowDefined from './isWindowDefined'

export const setEnvironment = (host: string): string => {
  if (!host) return ''
  let environment
  if (host.startsWith('local.')) {
    environment = 'DEVELOPMENT'
  } else if (host.startsWith('playground.')) {
    environment = 'PLAYGROUND'
  } else {
    environment = 'PRODUCTION'
  }
  return environment
}

const environment = (hostname => setEnvironment(hostname))(
  isWindowDefined ? window.location.hostname : undefined
)

export default environment
