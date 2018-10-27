import React from 'react'
import styled, { css } from 'easybib/theme/styled'

type nums = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface BoxProps {
  className?: string
  maxWidth?: number
  padding?: nums
  paddingX?: nums
  paddingY?: nums
  paddingBottom?: nums
  margin?: nums
  marginLeft?: nums
  marginRight?: nums
  marginBottom?: nums
  marginTop?: nums
  marginY?: nums
  children?: any
}

const Box: React.SFC<BoxProps> = ({
  className,
  maxWidth,
  padding,
  paddingX,
  paddingY,
  paddingBottom,
  margin,
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
  marginY,
  children,
}) => {
  const scale = 4

  const BoxElement = styled.div`
    ${margin &&
      css`
        margin: ${margin * scale}px;
      `}
    ${padding &&
      css`
        padding: ${padding * scale}px;
      `}
    ${maxWidth &&
      css`
        max-width: ${maxWidth};
      `}
    ${paddingBottom &&
      css`
        padding-bottom: ${paddingBottom * scale}px;
      `}
    ${paddingX &&
      css`
        padding-left: ${paddingX * scale}px;
        padding-right: ${paddingX * scale}px;
      `}
    ${paddingY &&
      css`
        padding-top: ${paddingX * scale}px;
        padding-bottom: ${paddingX * scale}px;
      `}
    ${marginY &&
      css`
        margin-top: ${marginY * scale}px;
        margin-bottom: ${marginY * scale}px;
      `}
    ${marginLeft &&
      css`
        margin-left: ${marginLeft * scale}px;
      `}
    ${marginRight &&
      css`
        margin-right: ${marginRight * scale}px;
      `}
    ${marginBottom &&
      css`
        margin-bottom: ${marginBottom * scale}px;
      `}
    ${marginTop &&
      css`
        margin-top: ${marginTop * scale}px;
      `}
  `

  return <BoxElement className={className}>{children}</BoxElement>
}

export default Box
