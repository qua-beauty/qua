import React, {useContext} from 'react';
import {Button, IconButton, styled, Typography} from '@mui/material';
import ProductInline from '../ProductInline.jsx';
import {Close} from '@mui/icons-material';
import BasketContext from './BasketContext.jsx';
import {BASKET_STEP} from './BasketProvider.jsx';

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

const BasketDetails = () => {
  const {basket, price, setBasketStep, collapseBasket} = useContext(BasketContext);

  return (
    <Base>
      <CloseButton onClick={collapseBasket}>
        <Close/>
      </CloseButton>
      <Title variant="h5">👨‍🍳 We are ready to cook!</Title>
      <Products>
        {basket && basket.products.map(product =>
          <ProductInline key={product.id} {...product} />)}
      </Products>
      <Button variant="contained" color="primary" size="large" onClick={() => setBasketStep(BASKET_STEP.delivery)}>Checkout {price}</Button>
    </Base>
  );
};

export default BasketDetails;