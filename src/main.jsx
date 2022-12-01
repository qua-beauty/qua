import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {BasketProvider} from './Basket';

const theme = createTheme({
  typography: {
    fontFamily: '"SF Pro", "Helvetica Nueu", Roboto'
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BasketProvider>
        <CssBaseline/>
        <App/>
      </BasketProvider>
    </ThemeProvider>
  </React.StrictMode>
);
