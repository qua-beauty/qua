import { extendTheme } from '@chakra-ui/react';
import { webApp } from './telegram.js';
import { rgba } from './utils.js';

export const isColorModeDark = webApp?.colorScheme === 'dark';

const paper = webApp?.themeParams.bg_color || '#ffffff';
const paperMaster = `linear-gradient(180deg, ${paper} 0%, ${rgba(paper, 0.5)} 52.08%, rgba(136, 81, 255, 0.10) 100%)`;
const paperReviews = isColorModeDark ? `linear-gradient(180deg, ${paper} 0%, rgba(137, 81, 255, 0.40) 100%)` : `linear-gradient(180deg, ${paper} 0%, #EEE5FF 100%)`;

const paperImmersiveLight = 'linear-gradient(180deg, rgba(137, 81, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%)';
const paperImmersiveDark = 'linear-gradient(180deg, rgba(137, 81, 255, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)';

const filtersGradientLight = 'linear-gradient(180deg, #FFF 0%, rgba(255, 203, 203, 0.35) 15.63%, rgba(137, 81, 255, 0.15) 56.77%, #FFF 100%)';
const filtersGradientDark = 'linear-gradient(180deg, #000 0%, rgba(97, 71, 255, 0.35) 15.63%, rgba(255, 81, 248, 0.15) 56.77%, #000 100%)';

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
    500: isColorModeDark ? '#8951FF' : '#8951FF',
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
    onPrimary: '#fff',
    onPrimarySecondary: 'rgba(255,255,255,0.72)'
  },
  background: {
    default: webApp?.themeParams.secondary_bg_color || '#ededed',
    paper,
    paperImmersive: isColorModeDark ? paperImmersiveDark : paperImmersiveLight,
    paperReviews,
    paperMaster,
    filters: isColorModeDark ? filtersGradientDark : filtersGradientLight
  },
  borderColor: 'rgba(137, 81, 255, 0.24)'
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
    },
    Button: {
      baseStyle: {

      },

    }
  },
  config,
  styles,
  colors,
  fontSizes,
  fonts,
});