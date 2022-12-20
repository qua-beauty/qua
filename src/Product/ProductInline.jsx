import React from 'react';
import {styled, Typography} from '@mui/material';
import {getCurrencyTitle} from '../utils.js';

const Base = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;


  img {
    border-radius: 50%;
    margin-top: 0;

    max-width: 56px;
    max-height: 56px;
  }
  
  & + & {
    margin-top: 12px;
  }
`;

const Title = styled(Typography)`
  margin-left: 16px;
`;

const Count = styled('div')`

`;

const Price = styled('div')`

`;

const Info = styled('div')`
  display: flex;
  align-items: center;
`;

const Image = styled('div')`
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;

  img {
    margin-top: 0;
    width: 100%;
  }
`;

const ProductInline = (product) => {
  const {title, photo, price, currency, count} = product;

  return (
    <Base>
      <Info>
        <Image>
          <img src={photo} alt=""/>
        </Image>
        <Title>{title}</Title>
      </Info>
      <Count>{count}</Count>
      <Price>{price} {getCurrencyTitle(currency)}</Price>
    </Base>
  );
};

export default ProductInline;