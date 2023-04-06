import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {router} from './router.jsx';
import {Provider} from 'react-redux';
import store from './api/store.js';
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import {chakraTheme} from './theme.js';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://fecb5b248f314366bd0cb92f8b076282@o4504967339048960.ingest.sentry.io/4504967344685056',
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary>
      <Provider store={store}>
        <ChakraProvider theme={chakraTheme}>
          <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode}/>
          <RouterProvider router={router}/>
        </ChakraProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
