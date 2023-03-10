import React from 'react';
import {Skeleton, Stack} from '@chakra-ui/react';

const ProductSkeleton = () => {
  return (
    <Stack alignItems={'center'}>
      <Skeleton startColor='background.default' endColor='telegram.300' width={'292px'} borderRadius={'32px'} height='220px' />
      <Skeleton startColor='background.default' endColor='telegram.300' width={'272px'} borderRadius={'12px'} height='20px' />
      <Skeleton startColor='background.default' endColor='telegram.300' width={'272px'} borderRadius={'12px'} height='20px' />
    </Stack>
  );
};

export default ProductSkeleton;