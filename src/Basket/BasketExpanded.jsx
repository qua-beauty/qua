import React, {useContext, useState} from 'react';
import {Button, IconButton, styled, Typography} from '@mui/material';
import ProductInline from '../ProductInline.jsx';
import CatalogContext from '../Catalog/CatalogContext.jsx';
import BasketContext from './BasketContext.jsx';
import {Close} from '@mui/icons-material';

const Base = styled('div')`
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

const BasketExpanded = ({ setExpanded }) => {
  const [loading, setLoading] = useState(false);
  const {getProduct} = useContext(CatalogContext);
  const {products, price, makeOrder} = useContext(BasketContext);

  const handleSend = async () => {
    setLoading(true);
    await makeOrder();
    setLoading(false);
  }

  return (
    <Base>
      <CloseButton onClick={() => setExpanded(false)}>
        <Close />
      </CloseButton>
      <Title variant="h5">👨‍🍳 We are ready to cook!</Title>
      <Products>
        {products && products.map(product =>
          <ProductInline key={product.id}
                         {...getProduct(product.id)}
                         count={product.count}/>)}
      </Products>
      <Button variant="contained" color="primary" size="large" onClick={handleSend} disabled={loading}>Send for cooking {price}</Button>
    </Base>
  );
};

export default BasketExpanded;