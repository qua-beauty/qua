import React from 'react';
import {styled} from '@mui/material';
import ProductSkeleton from './ProductSkeleton.jsx';

const Base = styled('div')`
  max-width: 800px;
  margin: 0 auto 0;
  
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;

  @media (min-width: 560px) {
    grid-template-columns: 33% 33% 33%;
  }

  @media (min-width: 720px) {
    grid-template-columns: 25% 25% 25% 25%;
  }
  
  > * {
    margin-bottom: 32px;
  }
`;
const CatalogSkeleton = () => {
  return (
    <Base>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </Base>
  );
};

export default CatalogSkeleton;
