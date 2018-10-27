import * as styledComponents from 'styled-components'

/* tslint:disable */
import { ThemedStyledComponentsModule } from 'styled-components'

import { easybibTheme } from './theme'

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<typeof easybibTheme>

export { css, injectGlobal, keyframes, ThemeProvider }
export default styled
