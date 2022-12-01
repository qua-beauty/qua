import React, {useState} from 'react';
import {addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import BasketContext from './BasketContext.jsx';
import {firestore} from '../firebase.js';

const BasketProvider = ({children, ...rest}) => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
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
    setPrice( price - parseInt(product.price));
  };

  const handleMakeOrder = async () => {
    const order = doc(collection(firestore, 'basket'));

    return await setDoc(order, {
      products,
      sumPrice: price,
      sumCount: count,
      date: new Date()
    })
  }

  return (
    <BasketContext.Provider {...rest} value={{
      products,
      count,
      price,
      currency: 'LKR',
      step,
      setStep,
      addProduct: handleProductAdd,
      deleteProduct: handleProductDelete,
      makeOrder: handleMakeOrder
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;