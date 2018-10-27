import {
  getLocalBibInfo,
  setLocal,
  deleteLocal,
  deleteEbUser,
  setEbUser,
  getUserBibInfo,
  LOCAL_STORAGE_KEYS,
} from '../localStorage'

describe('Local Storage', () => {
  it('sets local cache properly', () => {
    setLocal('key', 'value')
    const value = { key: 'value' }
    const parsedValue = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.easybibClientState)
    )
    expect(value).toEqual(parsedValue)
  })
  it('reads local cache properly', () => {
    setLocal('key', 'value')
    const value = { key: 'value' }
    const parsedValue = getLocalBibInfo()
    expect(value).toEqual(parsedValue)
  })
  it('deletes local cache key properly', () => {
    setLocal('key', 'value')
    const value = { key: 'value' }
    const parsedValue = getLocalBibInfo()
    expect(value).toEqual(parsedValue)
    deleteLocal('key')
    const newParsedValue = getLocalBibInfo()
    expect(newParsedValue).toEqual({})
  })
  it('sets token cache properly', () => {
    setEbUser({ key: 'value' })
    const value = { key: 'value' }
    const parsedValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ebUser))
    expect(value).toEqual(parsedValue)
    deleteEbUser()
  })
  it('reads token cache properly', () => {
    expect(getUserBibInfo()).toEqual({})
    setEbUser({ key: 'value' })
    const value = { key: 'value' }
    const parsedValue = getUserBibInfo()
    expect(value).toEqual(parsedValue)
  })
})
