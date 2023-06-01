import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Basket from './pages/Basket.jsx';
import Product from './pages/Product.jsx';
import App from './App.jsx';
import Catalog from './pages/Catalog.jsx';
import Shops from './pages/Shops.jsx';

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
        path: 'basket',
        element: (<Basket/>)
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
