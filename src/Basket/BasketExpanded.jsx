import React, {useContext, useState} from 'react';
import {Button, IconButton, styled, Typography} from '@mui/material';
import ProductInline from '../ProductInline.jsx';
import CatalogContext from '../Catalog/CatalogContext.jsx';
import BasketContext from './BasketContext.jsx';
import {Close} from '@mui/icons-material';

const Base = styled('div')`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  margin: 0 auto;
  max-width: 480px;

  background: linear-gradient(74.19deg, #FAD0C4 9.5%, #FAD0C4 10.09%, #F0D9FF 68.93%);
  backdrop-filter: blur(2px);
  border-radius: 24px 24px 0 0;

  padding: 40px 20px 80px;
  text-align: center;
`;

const Title = styled(Typography)`
  
`;

const Products = styled('div')`
  display: flex;
  flex-direction: column;
  
  margin: 40px 0;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const BasketExpanded = () => {
  const [loading, setLoading] = useState(false);
  const {getProductById} = useContext(CatalogContext);
  const {products, price, setStep, makeOrder} = useContext(BasketContext);

  const handleSend = async () => {
    setLoading(true);
    await makeOrder();
    setLoading(false);
  }

  return (
    <Base>
      <CloseButton onClick={() => setStep('INFO')}>
        <Close />
      </CloseButton>
      <Title variant="h5">👨‍🍳 We are ready to cook!</Title>
      <Products>
        {products && products.map(product =>
          <ProductInline key={product.id}
                         {...getProductById(product.id)}
                         count={product.count}/>)}
      </Products>
      <Button variant="contained" color="secondary" size="large" onClick={handleSend} disabled={loading}>Send for cooking {price}</Button>
    </Base>
  );
};

export default BasketExpanded;