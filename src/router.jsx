import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Booking from './pages/Booking.jsx';
import App from './App.jsx';
import MainPage from './pages/MainPage.jsx';
import Offer from './pages/Product.jsx';
import Shop from './pages/Shop.jsx';
import Filters from './pages/Filters.jsx';
import Payment from './pages/Payment.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App/>),
    children: [
      {
        path: '',
        element: (<MainPage/>),
      },
      {
        path: 'booking',
        element: (<Booking/>)
      },

      {
        path: 'filters',
        element: (<Filters/>)
      },
      {
        path: 'payment',
        element: (<Payment/>)
      },
      {
        path: 'product/:productId',
        element: (<Offer/>),
      },
      {
        path: 'shop/:shopId',
        element: (<Shop/>),
      },
    ]
  },
]);

export {
  router
};
