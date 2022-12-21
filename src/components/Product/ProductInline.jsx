import React from 'react';
import {styled, Typography} from '@mui/material';
import {getCurrencyTitle} from '../../utils.js';

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
  font-weight: 500;
`;

const Price = styled('div')`

`;

const Info = styled('div')`
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Image = styled('div')`
  height: 64px;
  width: 64px;
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
      <Image>
        <img src={photo} alt=""/>
      </Image>
      <Info>
        <Title color="primary">{title}</Title>
        <Price>{count} x {price} {getCurrencyTitle(currency)}</Price>
      </Info>
    </Base>
  );
};

export default ProductInline;