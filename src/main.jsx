import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import BasketProvider from './Basket/BasketProvider.jsx';
import CatalogProvider from './Catalog/CatalogProvider.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

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
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App />),
  },
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
