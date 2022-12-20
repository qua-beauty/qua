import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import BasketProvider from './Basket/BasketProvider.jsx';
import CatalogProvider from './Catalog/CatalogProvider.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ProductDetails from './Product/ProductDetails.jsx';
import BasketDetails from './Basket/BasketDetails.jsx';
import {webApp} from './telegramUtils.js';

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
          borderRadius: 16
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

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App />),
  },
  {
    path: '/basket',
    element: (<BasketDetails />)
  },
  {
    path: '/:productId',
    element: (<ProductDetails />)
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BasketProvider>
        <CatalogProvider>
          <CssBaseline/>
          <RouterProvider router={router} />
        </CatalogProvider>
      </BasketProvider>
    </ThemeProvider>
  </React.StrictMode>
);
