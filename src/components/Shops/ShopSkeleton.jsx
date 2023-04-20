import React from 'react';
import {Skeleton, Stack} from '@chakra-ui/react';

const ShopSkeleton = () => {
  return (
    <Stack alignItems={'center'} mb={'16px'}>
      <Skeleton startColor='background.default' endColor='telegram.300' width={'100%'} borderRadius={'16px'} height='220px' />
      <Skeleton startColor='background.default' endColor='telegram.300' width={'100%'} borderRadius={'16px'} height='20px' />
    </Stack>
  );
};

export default ShopSkeleton;