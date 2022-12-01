import React, {useContext} from 'react';
import {styled, Typography} from '@mui/material';
import {BasketContext} from './index.js';
import BasketExpanded from './BasketExpanded.jsx';

const Base = styled('div')`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  height: 124px;
  padding: 20px;

  background: linear-gradient(74.19deg, #FAD0C4 9.5%, #FAD0C4 10.09%, #F0D9FF 68.93%);
  backdrop-filter: blur(2px);
  border-radius: 24px 24px 0 0;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Info = styled('div')`
  display: flex;
  align-items: center;
`;

const Count = styled('div')`
  background: ${({theme}) => theme.palette.secondary.main};
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

  color: ${({theme}) => theme.palette.secondary.dark};
`;

const Basket = () => {
  const {products, count, price, currency, step, setStep} = useContext(BasketContext);

  const handleCheckout = () => {
    setStep('DETAILS');
  }

  return products.length > 0 && (
    step === 'INFO' ? (
      <Base onClick={handleCheckout}>
        <Info>
          <Count>{count}</Count>
          <Price>{price} {currency}</Price>
        </Info>
        <Action>Checkout 􀄫</Action>
      </Base>
    ) : (
      <BasketExpanded/>
    )
  )
};

export default Basket;