import React, {useContext} from 'react';
import {Box, styled, Typography} from '@mui/material';
import BasketContext from './BasketContext.jsx';
import BasketDetails from './BasketDetails.jsx';
import BasketDelivery from './BasketDelivery.jsx';
import {BASKET_STEP} from './BasketProvider.jsx';
import {getCurrencyTitle} from '../utils.js';
import {webApp} from '../telegramUtils.js';

const withOrderCss = {
  padding: '20px',
}

const withoutOrderCss = {
  padding: '20px 20px 20px',
  height: '72px',
}

const Base = styled(Box)`
  padding: 20px 20px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled('div')`
  display: flex;
  align-items: center;
`;

const Count = styled('div')`
  background: ${({theme}) => theme.palette.primary.main};
  border-radius: 50%;
  padding: 4px 12px;
  display: flex;

  color: #fff;

`;
const Price = styled(Typography)`
  display: block;
  margin-left: 20px;
`;
const Action = styled(Typography)`
  display: block;
  font-weight: 500;

  color: ${({theme}) => theme.palette.primary.dark};
`;

const BasketCollapsed = () => {
  const {count, price, currency, expandBasket, order} = useContext(BasketContext);



  return (
    <Base onClick={expandBasket} sx={order ? withOrderCss : withoutOrderCss}>
      <Info>
        <Count>{count}</Count>
        <Price>{price} {getCurrencyTitle(currency)}</Price>
      </Info>
      <Action>Продолжить 􀄫</Action>
    </Base>
  );
};

const Basket = () => {
  const {basket, basketExpanded, basketStep} = useContext(BasketContext);

  if(!basket || basket.products.length === 0) return <></>;

  if(basketExpanded) {
    if (basketStep === BASKET_STEP.delivery) return <BasketDelivery />;
    return <BasketDetails />
  }

  return <BasketCollapsed/>;

};

export default Basket;