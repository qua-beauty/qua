import React from 'react';
import {styled, Typography} from '@mui/material';

const Base = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;

  max-width: 50%;
  width: 190px;
  height: 240px;


  img {
    border-radius: 50%;
    margin-top: 0;

    max-width: 56px;
    max-height: 56px;
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

const ProductInline = (product) => {
  const {title, photo, price, currency, time, id} = product;

  return (
    <Base>
      <Info>
        <img src={photo} alt=""/>
        <Title>{title}</Title>
      </Info>
      <Count>1</Count>
      <Price>${price} ${currency}</Price>
    </Base>
  );
};

export default ProductInline;