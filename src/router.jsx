import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Booking from './pages/Booking.jsx';
import App from './App.jsx';
import MainPage from './pages/MainPage.jsx';
import Offer from './pages/Offer.jsx';

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
        path: 'product/:productId',
        element: (<Offer/>),
      },
    ]
  },
]);

export {
  router
};
