import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {BasketProvider} from './Basket';
import {CatalogProvider} from './Catalog';

const theme = createTheme({
  typography: {
    fontFamily: '"SF Pro", "Helvetica Nueu", Roboto'
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BasketProvider>
        <CatalogProvider>
          <CssBaseline/>
          <App/>
        </CatalogProvider>
      </BasketProvider>
    </ThemeProvider>
  </React.StrictMode>
);
