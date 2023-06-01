import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Basket from './pages/Basket.jsx';
import Offer from './pages/Offer.jsx';
import App from './App.jsx';
import ServicesCatalog from './pages/ServicesCatalog.jsx';
import Shops from './pages/Shops.jsx';

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
        path: 'basket',
        element: (<Basket/>)
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
