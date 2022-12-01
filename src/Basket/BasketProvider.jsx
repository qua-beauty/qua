import React, {useState} from 'react';
import BasketContext from './BasketContext.jsx';

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

  return (
    <BasketContext.Provider {...rest} value={{
      products,
      count,
      price,
      currency: 'LKR',
      step,
      setStep,
      onProductAdd: handleProductAdd,
      onProductDelete: handleProductDelete
    }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;