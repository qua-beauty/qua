import React, {useContext, useState} from 'react';
import {styled, Typography} from '@mui/material';
import BasketContext from './BasketContext.jsx';
import BasketExpanded from './BasketExpanded.jsx';

const Base = styled('div')`
  padding: 40px 20px 80px;
  height: 124px;

  display: flex;
  align-items: flex-start;
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

const BasketCollapsed = ({ setExpanded, count, price, currency }) => {
  return (
    <Base onClick={setExpanded}>
      <Info>
        <Count>{count}</Count>
        <Price>{price} {currency}</Price>
      </Info>
      <Action>Checkout 􀄫</Action>
    </Base>
  )
};

const Basket = () => {
  const [expanded, setExpanded] = useState(false);
  const {products, ...basketRest} = useContext(BasketContext);

  if(products.length <= 0) return <></>;

  return (
    expanded ? <BasketExpanded setExpanded={setExpanded}/> : <BasketCollapsed {...basketRest} setExpanded={() => setExpanded(true)} />
  );
};

export default Basket;