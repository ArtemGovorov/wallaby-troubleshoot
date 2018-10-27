import {
  loadCheggSuperAuth,
  getCheggAuthUrl,
  SuperAuth,
  SuperAuthExtras,
} from '../cheggauth'

describe('Chegg Auth', () => {
  const mockOptions = { showValueprop: true } as SuperAuthExtras
  describe('loadCheggSuperAuth', () => {
    it('pushes to the window oc cmd array', () => {
      const superAuth = {} as SuperAuth
      const options = {} as SuperAuthExtras
      window.oc = { cmd: [] }
      window.oc.cmd.push = jest.fn()
      loadCheggSuperAuth({ superAuth, options })
      expect(window.oc.cmd.push).toHaveBeenCalled()
    })
  })

  describe('getCheggAuthUrl', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    it('does not encode data if there is not a showvalueprop property on options', () => {
      window.btoa = jest.fn()
      getCheggAuthUrl()
      expect(window.btoa).toHaveBeenCalledTimes(0)
    })

    it('does encode data if there is a showvalueprop property on options', () => {
      window.btoa = jest.fn()
      getCheggAuthUrl(null, mockOptions)
      expect(window.btoa).toHaveBeenCalled()
    })

    it('returns the expected url given no arguments', () => {
      window.btoa = jest.fn(input => Buffer.from(input).toString('base64'))
      const expectedUrl =
        '//chegg-registry.test.cheggnet.com/chegg-auth/2.87.0?profile=EB&display=inline&defaultflow=signup&redirect_uri=https%3A%2F%2Fplayground.easybib.com%2Fauth%2Foauth%2Fchegg&fullpkg=1&providerurl=https%3A%2F%2Frc.live.test.cheggnet.com%2F'
      expect(getCheggAuthUrl()).toEqual(expectedUrl)
    })

    it('returns the expected url given options with showvalueprop', () => {
      window.btoa = jest.fn(input => Buffer.from(input).toString('base64'))
      const expectedUrl =
        '//chegg-registry.test.cheggnet.com/chegg-auth/2.87.0?profile=EB&display=inline&defaultflow=signup&redirect_uri=https%3A%2F%2Fplayground.easybib.com%2Fauth%2Foauth%2Fchegg&fullpkg=1&data=eyJ2YWx1ZXByb3AiOnsiaGVhZGVyIjoiRWFzeUJpYiBQbHVzIHN1YnNjcmlwdGlvbiBpbmNsdWRlcyIsImJ1bGxldDEiOiJBdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBjaXRhdGlvbnMgaW4gQVBBIGFuZCB0aG91c2FuZHMgb2Ygb3RoZXIgc3R5bGVzIiwiYnVsbGV0MiI6IkFkdmFuY2VkIGdyYW1tYXIgYW5kIHBsYWdpYXJpc20gZmVhdHVyZXMiLCJidWxsZXQzIjoiUGFyZW50aGV0aWNhbC9pbi10ZXh0IGNpdGF0aW9ucyBhbmQgZm9vdG5vdGVzIGZvciB5b3VyIHBhcGVyIiwiZm9vdGVyIjoiJDkuOTUgbW9udGhseS4gQ2FuY2VsIGFueXRpbWUuIiwiYnVsbGV0SGV4Q29sb3IiOiIjRUI3MTAwIiwiY29sb3JUaGVtZSI6ImxpZ2h0In19&providerurl=https%3A%2F%2Frc.live.test.cheggnet.com%2F'
      expect(getCheggAuthUrl(null, mockOptions)).toEqual(expectedUrl)
    })
  })
})
