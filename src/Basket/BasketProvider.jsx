import React, {useEffect, useState} from 'react';
import {collection, doc, setDoc, query, where, getDocs, getDoc} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, firestore} from '../firebase.js';
import BasketContext from './BasketContext.jsx';

export const STATUS = {
  cooking: 'Cooking...',
  cooked: 'Cooked',
  delivery: 'Delivering',
};

const BasketProvider = ({children, ...rest}) => {
  const [user, loading] = useAuthState(auth);
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

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
    const orderRef = doc(collection(firestore, 'basket'));
    const order = {
      products,
      sumPrice: price,
      sumCount: count,
      status: STATUS.cooking,
      date: new Date(),
      user: user.uid
    }

    await setDoc(orderRef, order);
    const orderId = await getDoc(orderRef);

    setOrder({
      ...order,
      id: orderId
    });
  };

  useEffect(() => {
    if (user) {
      const basket = collection(firestore, 'basket');
      const q = query(basket, where('user', '==', user.uid), where('status', '==', STATUS.cooking));

      getDocs(q).then(docs => {
        docs.forEach((doc) => {
          setOrder({
            ...doc.data(),
            id: doc.id
          });
        });
      });
    }
  }, [user]);

  return (
    <BasketContext.Provider {...rest} value={{
      products,
      count,
      price,
      currency: 'LKR',
      order,
      addProduct: handleProductAdd,
      deleteProduct: handleProductDelete,
      makeOrder: handleMakeOrder
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;