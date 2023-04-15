import React from 'react';
import {Skeleton, Stack} from '@chakra-ui/react';

const ProductSkeleton = () => {
  return (
    <Stack alignItems={'center'} width={'calc(50% - 8px)'} m={'4px'}>
      <Skeleton startColor='background.default' endColor='telegram.300' width={'100%'} borderRadius={'16px'} height='220px' />
      <Skeleton startColor='background.default' endColor='telegram.300' width={'100%'} borderRadius={'16px'} height='20px' />
      <Skeleton startColor='background.default' endColor='telegram.300' width={'100%'} borderRadius={'16px'} height='20px' />
    </Stack>
  );
};

export default ProductSkeleton;