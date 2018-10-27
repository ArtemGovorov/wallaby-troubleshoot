import { setEnvironment } from '../environment'

it('environment is correctly set by browser url\'s hostname', () => {
  expect(setEnvironment('local.url.com')).toEqual('DEVELOPMENT')
  expect(setEnvironment('playground.url.com')).toEqual('PLAYGROUND')
  expect(setEnvironment('production.url.com')).toEqual('PRODUCTION')
  expect(setEnvironment('anything.else.com')).toEqual('PRODUCTION')
})
