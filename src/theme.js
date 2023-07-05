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
    200: isColorModeDark ? '#8951FF' : '#8951FF',
    500: isColorModeDark ? '#5C10FF' : '#5C10FF',
    600: isColorModeDark ? '#5C10FF' : '#5C10FF'
  },
  brandText: {
    200: `rgba(0, 0, 0, 0.87)`,
    500: `rgba(0, 0, 0, 0.87)`,
  },
  text: {
    primary: isColorModeDark ? '#fff' : 'rgba(0, 0, 0, 0.87)',
    secondary: isColorModeDark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(0, 0, 0, 0.54)',
    disabled: isColorModeDark ? 'rgba(255, 255, 255, 0.54)' : 'rgba(0, 0, 0, 0.40)',
  },
  background: {
    default: webApp?.themeParams.secondary_bg_color || '#ededed',
    paper: webApp?.themeParams.bg_color || '#ffffff',
    paperImmersive: 'linear-gradient(180deg, rgba(137, 81, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%)',
    reviews: 'linear-gradient(180deg, #FFF 0%, #EEE5FF 99.99%, #FFF 100%)'
  }
};

const fontSizes = {
  xs: '0.75rem',
  sm: '0.8125rem',
  md: '0.875rem',
  lg: '0.9375',
  xl: '1rem',
  '2xl': '1.0625',
  '3xl': '1.12500',
  '4xl': '1.25rem',
  '5xl': '1.375rem',
  '6xl': '1.5rem',
  '7xl': '1.75rem',
  '8xl': '2rem',
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
  components: {
    Text: {
      baseStyle: {
        letterSpacing: '-0.02rem'
      }
    },
    Heading: {
      baseStyle: {
        letterSpacing: '-0.02rem',
        fontWeight: '500',
      }
    }
  },
  config,
  styles,
  colors,
  fontSizes,
  fonts,
});