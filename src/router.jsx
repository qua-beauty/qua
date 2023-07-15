import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Booking from './pages/Booking.jsx';
import App from './App.jsx';
import MainPage from './pages/MainPage.jsx';
import Shop from './pages/Shop.jsx';
import Filters from './pages/Filters.jsx';
import Payment from './pages/Payment.jsx';
import Maps from './pages/Maps.jsx';
import Portfolio from './pages/Portfolio.jsx';

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
        path: 'maps',
        element: (<Maps/>)
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
        path: 'shop/:shopId/portfolio/:portfolioId',
        element: (<Portfolio/>)
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
