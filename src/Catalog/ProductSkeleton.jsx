import React from 'react';
import {Skeleton, styled} from '@mui/material';

const Base = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  > * {
    margin-top: 8px;
  }
`;
const ProductSkeleton = () => {
  return (
    <Base>
      <Skeleton variant="circular" width={120} height={120} />
      <Skeleton variant="text" width={140} />
      <Skeleton variant="rounded" width={96} height={32} />
    </Base>
  );
};

export default ProductSkeleton;
