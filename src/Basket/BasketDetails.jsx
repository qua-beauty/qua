import React, {useContext} from 'react';
import {Button, IconButton, styled, Typography} from '@mui/material';
import ProductInline from '../ProductInline.jsx';
import {Close} from '@mui/icons-material';
import BasketContext from './BasketContext.jsx';
import {BASKET_STEP} from './BasketProvider.jsx';
import {getCurrencyTitle} from '../utils.js';

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

const SubmitButton = styled(Button)`
  text-transform: none;
`;

const ButtonSubtitle = styled('span')`
  font-size: 14px;
  
`;
const ButtonTitle = styled('span')`
  margin-left: 32px;
  font-size: 16px;
  
  span {
    margin-left: 8px;
  }
`;

const BasketDetails = () => {
  const {basket, price, currency, timeForCook, makeOrder, collapseBasket} = useContext(BasketContext);

  return (
    <Base>
      <CloseButton onClick={collapseBasket}>
        <Close/>
      </CloseButton>
      <Title variant="h5">👨‍🍳 Мы готовы к готовке!</Title>
      <Products>
        {basket && basket.products.map(product =>
          <ProductInline key={product.id} {...product} />)}
      </Products>
      <SubmitButton onClick={() => makeOrder()}
              variant="contained"
              color="primary"
              size="large">
        <ButtonSubtitle>Продолжить</ButtonSubtitle>
        <ButtonTitle>{price} {getCurrencyTitle(currency)}<span>{timeForCook ? ' 􀐱 ' + timeForCook: ''}</span></ButtonTitle>
      </SubmitButton>
    </Base>
  );
};

export default BasketDetails;