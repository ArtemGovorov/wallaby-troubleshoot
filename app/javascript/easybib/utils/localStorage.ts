import './localStoragePolyfill'
import { EBUser, EasybibClientState } from 'types/easybib'

export const LOCAL_STORAGE_KEYS = {
  easybibClientState: 'easybibClientState',
  ebUser: 'ebUser',
}

const getLocalBibInfo = (): EasybibClientState => {
  const localStorageString = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.easybibClientState
  )
  if (localStorageString) {
    // Only parse localstorage if it is not undefined or null;
    return JSON.parse(localStorageString) || {}
  }
  return {} as EasybibClientState
}

const getUserBibInfo = (): EBUser => {
  const localStorageString = window.localStorage.getItem(LOCAL_STORAGE_KEYS.ebUser)
  if (localStorageString) {
    return JSON.parse(localStorageString) || {}
  }
  return {} as EBUser
}
export const deleteLocal = (key: string) => {
  const local = getLocalBibInfo()
  delete local[key]
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.easybibClientState,
    JSON.stringify(local)
  )
  return true
}

const setEbUser = (user: EBUser) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.ebUser, JSON.stringify(user))
}

const setLocal = <T extends keyof EasybibClientState>(
  name: T,
  val: EasybibClientState[T]
) => {
  const local = getLocalBibInfo()
  local[name] = val
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.easybibClientState,
    JSON.stringify(local)
  )
  return true
}

export const deleteEbUser = () => {
  window.localStorage.removeItem('ebUser')
}

export const deleteLocalProjectID = () => {
  const user = getUserBibInfo()
  user.projectID = ''
  setEbUser(user)
}

export { getLocalBibInfo, getUserBibInfo, setEbUser, setLocal }
