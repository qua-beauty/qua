import {extendTheme} from '@chakra-ui/react';
import {webApp} from './telegram.js';
import {rgba} from './utils.js';

console.log(webApp);

export const isColorModeDark = webApp?.colorScheme === 'dark';

console.log(isColorModeDark, isColorModeDark ? 'dark' : 'light');

const config = {
  initialColorMode: isColorModeDark ? 'dark' : 'light',
  useSystemColorMode: false,
};

const colors = {
  telegram: {
    300: rgba(webApp?.themeParams.button_color || '#B378FF', 0.72),
    200: webApp?.themeParams.button_color || '#B378FF',
    100: rgba(webApp?.themeParams.button_color || '#B378FF', 0.12)
  },
  brand: {
    200: isColorModeDark ? '#EBFF73' : '#B378FF',
    500: isColorModeDark ? '#EBFF73' : '#6B2ABD'
  },
  text: {
    primary: webApp?.themeParams.text_color || 'rgba(0 0 0 / 0.87)',
    secondary: webApp?.themeParams.hint_color || 'rgba(0 0 0 / 0.54)',
  },
  background: {
    default: webApp?.themeParams.secondary_bg_color || '#ededed',
    paper: webApp?.themeParams.bg_color || '#ffffff'
  }
};

const fontSizes = {
  xs: '0.75rem',
  sm: '0.8125rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.25rem'
};

const fonts = {
  heading: `'Unbounded', sans-serif`,
  body: `'Montserrat', sans-serif`,
};

const styles = {
  global: {
    'html, body': {
      height: '100vh',
      backgroundColor: 'background.default',
    },
  },
};

export const chakraTheme = extendTheme({
  config,
  styles,
  colors,
  fontSizes,
  fonts,
});