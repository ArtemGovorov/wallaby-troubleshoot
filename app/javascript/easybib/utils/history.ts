import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

import isWindowDefined from 'easybib/utils/isWindowDefined'

export let push // eslint-disable-line import/no-mutable-exports

export const initHistory = (url: string, shouldForceRefresh: boolean) => {
  const history = isWindowDefined
    ? createBrowserHistory({ forceRefresh: shouldForceRefresh })
    : createMemoryHistory(url)
  push = isWindowDefined && history.push
  return history
}
