import React, {useEffect, useState} from 'react';
import {addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import BasketContext from './BasketContext.jsx';
import {firestore} from '../firebase.js';

const STATUS = {
  cooking: 'Cooking...',
  cooked: 'Cooked',
  delivery: 'Delivering',
}

const BasketProvider = ({children, ...rest}) => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [table, setTable] = useState(null);
  const [price, setPrice] = useState(0);
  const [isCooking, setIsCooking] = useState(false);
  const [step, setStep] = useState('INFO');

  const handleProductAdd = (product) => {
    const newProducts = [...products];
    const isProductExist = newProducts.filter(x => x.id === product.id)[0];

    if (isProductExist) {
      ++isProductExist.count;
    } else {
      newProducts.push({
        id: product.id,
        count: 1
      });
    }

    setProducts(newProducts);
    setCount(count + 1);
    setPrice(price + parseInt(product.price));
  };

  const handleProductDelete = (product) => {
    const newProducts = products.filter(p => {
      if (p.id === product.id) {
        if (p.count <= 1) return false;
        --p.count;
      }

      return p;
    });

    setProducts(newProducts);
    setCount(count - 1);
    setPrice(price - parseInt(product.price));
  };

  const handleMakeOrder = async () => {
    const order = doc(collection(firestore, 'basket'));

    await setDoc(order, {
      products,
      sumPrice: price,
      sumCount: count,
      table,
      status: STATUS.cooking,
      date: new Date()
    });

    setIsCooking(true);
    setStep('COOKING');
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const table = urlParams.get('table');

    if (table) {
      setTable(table);
    }
  }, []);

  return (
    <BasketContext.Provider {...rest} value={{
      products,
      count,
      price,
      currency: 'LKR',
      step,
      table,
      setStep,
      isCooking,
      setIsCooking,
      addProduct: handleProductAdd,
      deleteProduct: handleProductDelete,
      makeOrder: handleMakeOrder
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;