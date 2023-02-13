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
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 50%;
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  position: relative;
  z-index: 1;

  img {
    margin-top: 0;
    width: 100%;
  }
`;

const NoImage = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  
  opacity: 0.6;
  filter: grayscale(100%) ;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  z-index: -1;
`;

const ProductInline = (product) => {
  const {name, image, price, icon, currency, count} = product;

  return (
    <Base>
      <Image>
        {image && <img src={image} alt=""/>}
        <NoImage>{icon}</NoImage>
      </Image>
      <Info>
        <Title color="primary">{name}</Title>
        <Price>{count} x {price} {getCurrencyTitle(currency)}</Price>
      </Info>
    </Base>
  );
};

export default ProductInline;