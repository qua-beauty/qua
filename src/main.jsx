import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {router} from './router.jsx';
import {Provider} from 'react-redux';
import store from './api/store.js';
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import {chakraTheme} from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider theme={chakraTheme}>
          <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode}/>
          <RouterProvider router={router}/>
        </ChakraProvider>
      </Provider>
  </React.StrictMode>
);
