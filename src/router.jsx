import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import BasketDetails from './components/BasketDetails.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import App from './App.jsx';
import Shops from './components/Shops.jsx';
import ShopCatalog from './components/ShopCatalog.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App/>),
    children: [
      {
        path: '',
        element: (<Shops/>),
      },
      {
        path: 'shop/:shopId',
        element: (<ShopCatalog/>),
      },
      {
        path: 'basket',
        element: (<BasketDetails/>)
      },
      {
        path: 'shop/:shopId/product/:productId',
        element: (<ProductDetails/>),
      },
    ]
  },
]);

export {
  router
};
