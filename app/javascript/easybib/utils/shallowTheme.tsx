import React from 'react'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import { easybibTheme } from 'easybib/theme'

const shallowWithTheme = (tree, theme = easybibTheme) => {
  const context = (shallow(<ThemeProvider theme={theme} />) as any)
    .instance()
    .getChildContext()
  return shallow(tree, { context })
}

export default shallowWithTheme
