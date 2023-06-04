import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Booking from './pages/Booking.jsx';
import App from './App.jsx';
import Catalog from './pages/Catalog.jsx';
import Offer from './pages/Offer.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App/>),
    children: [
      {
        path: '',
        element: (<Catalog/>),
      },
      {
        path: 'shop/:shopId',
        element: (<Catalog/>),
      },
      {
        path: 'market/:shopId',
        element: (<Catalog/>),
      },
      {
        path: 'booking',
        element: (<Booking/>)
      },
      {
        path: 'product/:productId',
        element: (<Offer/>),
      },
    ]
  },
]);

export {
  router
};
