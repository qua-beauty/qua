import {extendTheme} from '@chakra-ui/react';
import {webApp} from './telegram.js';
import {rgba} from './utils.js';

export const isColorModeDark = webApp?.colorScheme === 'dark';

const config = {
  initialColorMode: isColorModeDark ? 'dark' : 'light',
  useSystemColorMode: false,
};

const colors = {
  telegram: {
    300: rgba(webApp?.themeParams.button_color || '#B378FF', 0.35),
    200: webApp?.themeParams.button_color || '#B378FF',
    100: rgba(webApp?.themeParams.button_color || '#B378FF', 0.12)
  },
  brand: {
    200: isColorModeDark ? '#DEFFA9' : '#DEFFA9',
    500: isColorModeDark ? '#DEFFA9' : '#DEFFA9'
  },
  brandText: {
    200: `rgba(0, 0, 0, 0.87)`,
    500: `rgba(0, 0, 0, 0.87)`,
  },
  text: {
    primary: isColorModeDark ? '#fff' : 'rgba(0, 0, 0, 0.87)',
    secondary: isColorModeDark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(0, 0, 0, 0.54)',
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
  xl: '1.0625rem',
  '2x1': '1.25rem',
  '4x1': '1.75rem'
};

const fonts = {
  heading: `'Inter', Helvetica, sans-serif`,
  body: `'Inter', Helvetica, sans-serif`,
};

const styles = {
  global: {
    'html, body': {
      height: '100vh',
      backgroundColor: 'background.paper',
      color: 'text.primary'
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