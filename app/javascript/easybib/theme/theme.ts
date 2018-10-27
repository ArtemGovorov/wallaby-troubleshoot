export const baseTheme = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: '4px',
  scale: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 7,
  },
  border: {
    colors: {
      gray: '#f4f4f4',
    },
  },
  font: {
    heading: {
      size: {
        md: '20px',
        lg: '28px',
        xl: '34px',
      },
    },
    text: {
      size: {
        xs: '9px',
        sm: '12px',
        md: '14px',
        lg: '16px',
      },
    },
    lineHeight: {
      md: 1.2,
      lg: 1.5,
    },
  },
  colors: {
    red: '#d33f2a',
    black: '#000',
    white: '#fff',
    orange: '#ff5313',
    orangeLight: '#FFF2EC',
    orangeDark: '#ec4203',
    orangeDarker: '#d23900',
    beige: '#ffe7c4',
    sand: '#ffb751',
    yellow: '#ffc800',
    yellowLight: 'rgba(255,200,0,0.25)',
    blue: '#0090ff',
    greyEEE: '#eee',
    greyDDD: '#ddd',
    grey: '#999',
    greyLight: '#ccc',
    greylighter: '#d6d6d6',
    greyLightest: '#f8f8f8',
    greyDark: '#333',
    gold: '#dd8d00',
    green: '#4dc66d',
    teal: '#2caea6',
    borderColor: '#ededed',
    borderColor2: '#ddd',
  },
}

export const bibmeTheme = {
  ...baseTheme,
  site: 'bibme',
  font: {
    ...baseTheme.font,
    family: '"Helvetica Neue", Helvetica, sans-serif',
  },
  colors: {
    ...baseTheme.colors,
    blue2A8: '#2A8EB3',
    blueECF: '#ECF7FC',
    blue: '#1B3B54',
  },
}

export const easybibTheme = {
  ...baseTheme,
  site: 'easybib',
}
