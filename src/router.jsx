import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Basket from './pages/Basket.jsx';
import Offer from './pages/Offer.jsx';
import App from './App.jsx';
import Categories from './pages/Categories.jsx';
import Shops from './pages/Shops.jsx';

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
