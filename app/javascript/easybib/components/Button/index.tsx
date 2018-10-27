import styled, { css } from 'styled-components'

interface ButtonProps {
  inline?: boolean
  primary?: boolean
  newPrimary?: boolean
  lightGray?: boolean
  tertiary?: boolean
  blue?: boolean
}

const Button = styled.a<ButtonProps>`
  padding: 13px 27px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  font-size: ${props => props.theme.font.text.size.md};
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  line-height: 1.42857143;
  border-radius: 3px;
  text-decoration: none;
  user-select: none;
  &:hover {
  }
  &:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
  &:active,
  &:focus {
    outline: none;
    text-decoration: none;
  }
  &:disabled,
  &.disabled {
    opacity: 0.3;
  }
  &:focus {
    border-color: ${props => props.theme.colors.blue};
  }

  ${props =>
    props.primary &&
    css`
      border-color: ${props.theme.colors.orange};
      background-color: ${props.theme.colors.white};
      width: auto;
      height: 50px;
      text-decoration: none;
      color: ${props.theme.colors.orange};
      font-size: ${props.theme.font.text.size.md};
      border-radius: 3px;
      font-weight: 400;
      min-width: auto;
      &:hover {
        color: ${props.theme.colors.orangeDark};
        border-color: ${props.theme.colors.orangeDark};
        &:active {
          color: ${props.theme.colors.orangeDarker};
          border-color: ${props.theme.colors.orangeDarker};
        }
      }
      &:focus {
        color: ${props.theme.colors.orange};
        border-color: ${props.theme.colors.blue};
      }
    `};

  ${props =>
    props.newPrimary &&
    css`
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.orange};
      &:hover,
      &:active,
      &:focus {
        color: ${props.theme.colors.white};
      }
    `};

  ${props =>
    props.lightGray &&
    css`
      color: ${props.theme.colors.greyDark};
      background: ${props.theme.colors.greyEEE};
      &:hover,
      &:active,
      &:focus {
        color: ${props.theme.colors.black};
      }
      &:hover {
        background: ${props.theme.colors.greyLight};
        &:active {
          background: ${props.theme.colors.grey};
        }
      }
    `};

  ${props =>
    props.blue &&
    css`
      border-color: ${props.theme.colors.blue};
      background-color: ${props.theme.colors.white};
      width: auto;
      height: 33px;
      padding: 6px 12px;
      border-width: 1px;
      text-decoration: none;
      color: ${props.theme.colors.blue};
      font-size: ${props.theme.font.text.size.md};
      border-radius: 3px;
      font-weight: 400;
      min-width: auto;
      &:hover {
        color: ${props.theme.colors.blue};
        border-color: ${props.theme.colors.blue};
        &:active {
          color: ${props.theme.colors.blue};
          border-color: ${props.theme.colors.blue};
        }
      }
      &:focus {
        color: ${props.theme.colors.blue};
        border-color: ${props.theme.colors.blue};
      }
    `};

  ${props =>
    props.tertiary &&
    css`
      color: ${props.theme.colors.black};
      background: ${props.theme.colors.greylighter};
      &:hover,
      &:active,
      &:focus {
        color: ${props.theme.colors.black};
      }
      &:hover {
        background: ${props.theme.colors.greyLight};
        &:active {
          background: ${props.theme.colors.grey};
        }
      }
    `};
`

export default Button
