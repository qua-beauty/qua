import React from 'react';
import {Skeleton, styled} from '@mui/material';

const Base = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;

  padding-left: 20px;
  
  > * {
    margin-right: 16px;
  }
`;
const FiltersSkeleton = () => {
  return (
    <Base>
      <Skeleton variant="rounded" width={140} height={32} />
      <Skeleton variant="rounded" width={160} height={32} />
      <Skeleton variant="rounded" width={120} height={32} />
      <Skeleton variant="rounded" width={160} height={32} />
    </Base>
  );
};

export default FiltersSkeleton;
