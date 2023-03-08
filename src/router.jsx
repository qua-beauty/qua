import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Basket from './pages/Basket.jsx';
import Product from './pages/Product.jsx';
import App from './App.jsx';
import Catalog from './pages/Catalog.jsx';

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
