import React from 'react';
import ProductSkeleton from './ProductSkeleton.jsx';
import {Box, Flex, Skeleton, Stack} from '@chakra-ui/react';

const CatalogSkeleton = () => {
  return (
    <Box p={'16px'}>
      <Skeleton startColor='background.default' endColor='telegram.300' width={'100%'} borderRadius={'16px'} height='56px' />

      <Flex flexWrap={'wrap'} m={'24px -4px 0'}>
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </Flex>
    </Box>
  );
};

export default CatalogSkeleton;