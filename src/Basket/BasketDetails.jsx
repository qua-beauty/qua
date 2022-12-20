import React, {useContext, useEffect} from 'react';
import {Button, styled, Typography} from '@mui/material';
import ProductInline from '../Product/ProductInline.jsx';
import BasketContext from './BasketContext.jsx';
import {getCurrencyTitle} from '../utils.js';
import {webApp} from '../telegramUtils.js';
import {useNavigate} from 'react-router-dom';

const Base = styled('div')`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 16px 16px 16px;
`;

const Title = styled(Typography)`
  display: inline-flex;
  align-items: center;

  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 16px;
  
  height: 32px;
  padding: 0 12px;
  
  font-weight: 700;
  text-transform: uppercase;
  
  span {
    margin-left: 4px;
    font-size: 2rem;
  }
`;

const Products = styled('div')`
  display: flex;
  flex-direction: column;

  margin: 16px 0 0px;
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
  const {basket, price, currency, timeForCook, makeOrder} = useContext(BasketContext);
  const navigate = useNavigate();

  if(webApp) {
    webApp.MainButton.text = `Оформить заказ 🎛 ${price} ${getCurrencyTitle(currency)}`;
    webApp.MainButton.color = '#66bb6a';
    webApp.MainButton.onClick(makeOrder);
    webApp.MainButton.enable();

    webApp.BackButton.show();
    webApp.BackButton.onClick(() => {
      navigate('/');
    })
  }

  useEffect(() => {
    return () => {
      if(webApp){
        webApp.MainButton.offClick(makeOrder);
      }
    }
  }, [])

  return (
    <Base>
      <Title color="textPrimary" variant="caption">Ваша корзина</Title>
      <Products>
        {basket && basket.products.map(product =>
          <ProductInline key={product.id} {...product} />)}
      </Products>
      {!webApp && <SubmitButton onClick={() => makeOrder()}
              variant="contained"
              color="primary"
              size="large">
        <ButtonSubtitle>Продолжить</ButtonSubtitle>
        <ButtonTitle>{price} {getCurrencyTitle(currency)}<span>{timeForCook ? ' 􀐱 ' + timeForCook: ''}</span></ButtonTitle>
      </SubmitButton>}
    </Base>
  );
};

export default BasketDetails;