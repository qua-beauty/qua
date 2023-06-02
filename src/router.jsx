import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Booking from './pages/Booking.jsx';
import App from './App.jsx';
import Categories from './pages/Categories.jsx';
import Offer from './pages/Offer.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App/>),
    children: [
      {
        path: '',
        element: (<Categories/>),
      },
      {
        path: 'shop/:shopId',
        element: (<Categories/>),
      },
      {
        path: 'market/:shopId',
        element: (<Categories/>),
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
