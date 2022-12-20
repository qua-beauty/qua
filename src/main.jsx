import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import BasketProvider from './Basket/BasketProvider.jsx';
import CatalogProvider from './Catalog/CatalogProvider.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ProductDetails from './Product/ProductDetails.jsx';

const theme = createTheme({
  typography: {
    fontFamily: '"SF Pro", "Helvetica Nueu", Roboto'
  },
  palette: {
    primary: {
      main: '#4C3CAC'
    },
    secondary: {
      main: '#B8FCCB'
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
