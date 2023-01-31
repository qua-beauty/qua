import React from 'react';
import ReactDOM from 'react-dom/client';
import {createTheme, CssBaseline, GlobalStyles, ThemeProvider} from '@mui/material';
import {RouterProvider} from 'react-router-dom';
import BasketProvider from './components/Basket/BasketProvider.jsx';
import CatalogProvider from './components/Catalog/CatalogProvider.jsx';
import {webApp} from './telegram.js';
import {router} from './router.jsx';

const theme = createTheme({
  typography: {
    fontFamily: '"SF Pro", "Helvetica Nueu", Roboto'
  },
  palette: {
    mode: webApp ? webApp.colorScheme : 'light',
    primary: {
      main: webApp ? webApp.themeParams.button_color : '#4C3CAC'
    },
    secondary: {
      main: '#B8FCCB'
    },
    text: {
      primary: webApp ? webApp.themeParams.text_color : 'rgba(0 0 0 / 0.87)',
      secondary: webApp ? webApp.themeParams.hint_color : 'rgba(0 0 0 / 0.54)',
    },
    background: {
      default: webApp ? webApp.themeParams.secondary_bg_color : '#ededed',
      paper: webApp ? webApp.themeParams.bg_color : '#fff'
    }
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 48,
          borderRadius: 16,
          textTransform: 'none'
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        rounded: {
          borderRadius: '16px'
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CatalogProvider>
        <BasketProvider>

          <CssBaseline/>
          <GlobalStyles
            styles={{
              body: {
                background: webApp ? webApp.themeParams.bg_color : '#fff'
              }
            }}
          />
          <RouterProvider router={router}/>
        </BasketProvider>
      </CatalogProvider>
    </ThemeProvider>
  </React.StrictMode>
);
