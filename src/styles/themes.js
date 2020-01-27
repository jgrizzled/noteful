// light and dark themes

const baseTheme = {
  fontSize: {
    small: '0.85rem',
    normal: '1rem',
    large: '1.25rem',
    xLarge: '1.5rem',
    xxLarge: '2rem'
  },
  font: {
    main: "'Roboto', sans-serif;"
  },
  fontWeight: {
    normal: '400',
    bold: '700'
  },
  breakpoint: {
    medium: '600px',
    large: '1000px'
  }
};

const lightTheme = {
  ...baseTheme,
  color: {
    primary: '#2bbd7e',
    background: '#FFFFFF',
    surface: '#f2f2f2',
    error: '#B00020',
    onPrimary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    link: '#1890ff'
  },
  boxShadow: {
    normal: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    normalHover: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
  }
};

const darkTheme = {
  ...baseTheme,
  color: {
    primary: '#2bbd7e',
    background: '#121212',
    surface: '#333333',
    error: '#CF6679',
    onPrimary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    link: '#99ceff'
  },
  boxShadow: {
    normal:
      '0 1px 3px rgba(255, 255, 255, 0.25), 0 1px 2px rgba(255, 255, 255, 0.25)',
    normalHover:
      '0px 5px 14px rgba(255, 255, 255, 0.5), 0px 3px 5px rgba(255, 255, 255, 0.22)'
  }
};

export default {
  light: lightTheme,
  dark: darkTheme
};
