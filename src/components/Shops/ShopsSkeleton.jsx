import React from 'react';
import {Box} from '@chakra-ui/react';
import ShopSkeleton from './ShopSkeleton.jsx';

const ShopsSkeleton = () => {
  return (
    <Box p={'16px'}>
      <ShopSkeleton />
      <ShopSkeleton />
    </Box>
  );
};

export default ShopsSkeleton;