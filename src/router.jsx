import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import BasketDetails from './components/Basket/BasketDetails.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Home from './components/Home.jsx';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<App />),
    children: [
      {
        path: '',
        element: (<Home />),
      },
      {
        path: 'basket',
        element: (<BasketDetails />)
      },
      {
        path: 'product/:productId',
        element: (<ProductDetails />)
      }
    ]
  },
]);

export {
  router
};
