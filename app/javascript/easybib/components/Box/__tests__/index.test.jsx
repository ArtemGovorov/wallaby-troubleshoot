import React from 'react'
import { shallow } from 'enzyme'
import { baseTheme } from 'easybib/theme/theme'
import Box from '../index'

describe('<Box />', () => {
  it('should render without blowing up', () => {
    const renderedComponent = shallow(
      <Box theme={baseTheme} display="flex">
        Box
      </Box>
    )
    expect(renderedComponent).toMatchSnapshot()
  })
})
