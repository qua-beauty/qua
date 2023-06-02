import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Booking from './pages/Booking.jsx';
import Product from './pages/Product.jsx';
import App from './App.jsx';
import ServicesCatalog from './pages/ServicesCatalog.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App/>),
    children: [
      {
        path: '',
        element: (<ServicesCatalog/>),
      },
      {
        path: 'shop/:shopId',
        element: (<ServicesCatalog/>),
      },
      {
        path: 'market/:shopId',
        element: (<ServicesCatalog/>),
      },
      {
        path: 'booking',
        element: (<Booking/>)
      },
      {
        path: 'product/:productId',
        element: (<Product/>),
      },
    ]
  },
]);

export {
  router
};
