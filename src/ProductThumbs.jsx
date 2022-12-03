import React, {useContext, useState} from 'react';
import CatalogContext from './Catalog/CatalogContext.jsx';
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
  const {getProduct} = useContext(CatalogContext);

  if (!products) return <></>;

  return (
    <Base>
      {products && products.map(product => {
        return <img key={product.id} src={getProduct(product.id).photo} width={sizes[size]} height={sizes[size]} alt=""/>;
      })}
    </Base>
  );
};

export default ProductThumbs;