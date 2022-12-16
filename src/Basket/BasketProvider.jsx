import React, {useEffect, useState} from 'react';
import {collection, doc, setDoc, query, where, getDocs, getDoc, onSnapshot} from 'firebase/firestore';
import {signInWithCustomToken} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, siteUrl, firestore} from '../firebase.js';
import BasketContext from './BasketContext.jsx';
import {webApp} from '../telegramUtils.js';
import {settings} from '../settings.js';
import salebot from '../salebot.js';

export const BASKET_STEP = {
  details: 'DETAILS',
  delivery: 'DELIVERY',
  login: 'LOGIN'
};

const BasketProvider = ({children, ...rest}) => {
  const [user,] = useAuthState(auth);
  const [order, setOrder] = useState(null);
  const [basket, setBasket] = useState(null);
  const [currency,] = useState('LKR');

  const [basketExpanded, setBasketExpanded] = useState(false);
  const [basketStep, setBasketStep] = useState(null);

  const handleCollapse = () => setBasketExpanded(false);
  const handleExpand = () => setBasketExpanded(true);

  const handleProductAdd = (product) => {
    const products = basket ? [...basket.products] : [];
    const isProductExist = products.filter(x => x.id === product.id)[0];

    if (isProductExist) {
      ++isProductExist.count;
    } else {
      products.push({
        ...product,
        count: 1,
      });
    }

    setBasket({products});
  };

  const handleProductDelete = (product) => {
    const products = basket.products.filter(p => {
      if (p.id === product.id) {
        if (p.count <= 1) return false;
        --p.count;
      }

      return p;
    });

    setBasket({products});
  };

  const handleMakeOrder = async () => {
    const orderRef = doc(collection(firestore, 'orders'));
    const currentTime = new Date();
    const endTime = currentTime.setMinutes(currentTime.getMinutes() + 15);
    const userId = user ? user.uid : null;
    const {products} = basket;

    const order = {
      products,
      endTime,
      user: userId
    };

    await setDoc(orderRef, order);
    const orderSnap = await getDoc(orderRef);

    setOrder({
      ...order,
      id: orderSnap.id
    });

    setBasket(null);
    setBasketStep(BASKET_STEP.details);
    setBasketExpanded(false);

    if(settings.integrations.includes('salebot')) {
      salebot.saveOrder(orderSnap, userId).then();
    }

    onSnapshot(orderRef, async (orderSnap) => {
      const data = orderSnap.data();

      if (!auth.currentUser && data.token) {
        await signInWithCustomToken(auth, data.token);
      }
    });

    if (webApp) {
      webApp.close();
    } else {
      window.open(`https://t.me/lankacafebot?start=${orderSnap.id}`);
    }
  };

  useEffect(() => {
    if (user) {
      const basket = collection(firestore, 'orders');
      const q = query(basket, where('user', '==', user.uid));

      getDocs(q).then(docs => {
        docs.forEach((doc) => {
          console.log(doc.data())
          if (!order) setOrder({
            ...doc.data(),
            id: doc.id
          });
        });
      });
    }
  }, [user]);

  const getTimeForCook = () => {
    if (!basket) return null;

    const timesCount = basket.products.length + 1;
    const timesSum = basket.products.reduce((acc, product) => acc + parseInt(product.time), 0);
    const timesAvg = timesSum / timesCount;

    return timesAvg + timesSum * ((timesCount - 1) * 0.1);
  };

  const getCount = () => {
    if (!basket) return null;
    return basket.products.reduce((acc, product) => acc + parseInt(product.count), 0);
  };

  const getSum = () => {
    if (!basket) return 0;
    return basket.products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);
  };

  return (
    <BasketContext.Provider {...rest} value={{
      basket,
      currency,
      order,
      count: getCount(),
      price: getSum(),
      timeForCook: getTimeForCook(),
      basketExpanded,
      basketStep,
      setBasketExpanded,
      setBasketStep,
      collapseBasket: handleCollapse,
      expandBasket: handleExpand,
      addProduct: handleProductAdd,
      deleteProduct: handleProductDelete,
      makeOrder: handleMakeOrder,
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;