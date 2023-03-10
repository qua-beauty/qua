import React from 'react';
import ProductSkeleton from './ProductSkeleton.jsx';
import {Stack} from '@chakra-ui/react';

const CatalogSkeleton = () => {
  return (
    <Stack padding={'0 12px 12px 12px'} gap={'2.5rem'}>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </Stack>
  );
};

export default CatalogSkeleton;