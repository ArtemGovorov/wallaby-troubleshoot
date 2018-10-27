import { css } from 'styled-components'

/*
Remember: these are min width. Breakpoints are mostly
thought of in max-width fashion
*/

interface MediaFuncs {
  giant: (css: TemplateStringsArray) => {}
  desktop: (css: TemplateStringsArray) => {}
  tablet: (css: TemplateStringsArray) => {}
  phone: (css: TemplateStringsArray) => {}
}

const sizes = {
  giant: 1170,
  desktop: 992,
  // giant: 800,
  tablet: 798,
  phone: 550,
}

export default Object.keys(sizes).reduce(
  (accumulator, label) => {
    const emSize = sizes[label] / 16
    /* eslint-disable no-param-reassign */
    accumulator[label] = (...args) => css`
      @media (min-width: ${emSize}em) {
        ${css.call(this, ...args)};
      }
    `
    return accumulator
  },
  {} as MediaFuncs
)
