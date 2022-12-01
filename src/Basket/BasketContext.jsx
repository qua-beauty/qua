import {createContext} from 'react';

const initialValue = {
  products: [],
  count: 0,
  currency: 'LKR',
  step: 'INFO', // 'INFO' | 'DETAILS' | 'DELIVERY' | 'SUCCESS'
  onProductAdd: () => {},
  onProductDelete: () => {}
};

const BasketContext = createContext(initialValue);

export default BasketContext;