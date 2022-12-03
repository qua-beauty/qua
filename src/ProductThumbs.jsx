import React from 'react';
import {styled} from '@mui/material';

const Base = styled('div')`
  display: flex;
  

  img {
    border-radius: 50%;
    transition: width, height 225ms ease;

    & + img {
      margin-left: -16px;
    }
  }
`;

const sizes = {
  small: 40,
  medium: 56
};

const ProductThumbs = ({products, size = 'medium'}) => {
  if (!products) return <></>;

  return (
    <Base>
      {products && products.map(product => {
        return <img key={product.id} src={product.photo} width={sizes[size]} height={sizes[size]} alt=""/>;
      })}
    </Base>
  );
};

export default ProductThumbs;