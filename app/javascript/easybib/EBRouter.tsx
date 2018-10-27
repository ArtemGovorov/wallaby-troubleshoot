import React from 'react'
import { StaticRouter } from 'react-router'
import { Router } from 'react-router-dom'
import isWindowDefined from 'easybib/utils/isWindowDefined'
import { initHistory } from 'easybib/utils/history'
import { BackendOpts } from 'types/easybib'

interface Props {
  children: JSX.Element
  url: string
  backendOpts: BackendOpts
}

const EBRouter: React.SFC<Props> = ({ url, backendOpts, children }) => {
  const shouldForceRefresh = !(backendOpts && backendOpts.spa)
  const history = initHistory(url, shouldForceRefresh)
  if (isWindowDefined) {
    return <Router history={history}>{children}</Router>
  }
  const staticRouterContext = {}
  return (
    <StaticRouter context={staticRouterContext} location={url}>
      {children}
    </StaticRouter>
  )
}

export default EBRouter
