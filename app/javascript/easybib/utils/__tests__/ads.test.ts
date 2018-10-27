import { refreshAds } from '../ads'

describe('Refresh ads Util', () => {
  beforeEach(() => {
    window.SBMGlobal = { run: { reload: jest.fn() } }
  })
  it('calls the SBMGlobal reload function', () => {
    refreshAds('testzone')
    expect(window.SBMGlobal.run.reload).toHaveBeenCalled()
  })
  it('calls the SBMGlobal reload function with the config adzone', () => {
    refreshAds('config')
    const reloadArgs = {
      type: 'pagechange',
      pagetype: 'config',
      pageCount: undefined,
      citationCount: 0,
    }
    expect(window.SBMGlobal.run.reload).toHaveBeenCalledWith(reloadArgs)
  })
  it('calls the SBMGlobal reload function with the search adzone', () => {
    refreshAds('search')
    const reloadArgs = {
      type: 'pagechange',
      pagetype: 'search',
      pageCount: undefined,
      citationCount: 0,
    }
    expect(window.SBMGlobal.run.reload).toHaveBeenCalledWith(reloadArgs)
  })
})
