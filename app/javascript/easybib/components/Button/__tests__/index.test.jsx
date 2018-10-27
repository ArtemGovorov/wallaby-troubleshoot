import React from 'react'
import shallowWithTheme from 'easybib/utils/shallowTheme'
import Button from '../index'

describe('<Button />', () => {
  it('should render without blowing up', () => {
    const renderedComponent = shallowWithTheme(<Button primary>Button</Button>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
