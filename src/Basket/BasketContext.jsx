import {createContext} from 'react';

const initialValue = {
  products: [],
  count: 0,
  currency: 'LKR',
  step: 'INFO', // 'INFO' | 'DETAILS' | 'COOKING' | 'SUCCESS',
  isCooking: false,
  addProduct: () => {},
  deleteProduct: () => {}
};

const BasketContext = createContext(initialValue);

export default BasketContext;