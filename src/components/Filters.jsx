import React from 'react';
import {Box, Chip, styled} from '@mui/material';
import {toggleFilter} from '../api/slices/filterSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategoriesByShopId} from '../api/slices/categorySlice.js';

const Base = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;
  
  margin-top: 8px;
  max-width: 100%;

  > .MuiChip-root {
    font-size: 14px;

    + .MuiChip-root {
      margin-left: 8px;
    }
  }
`;

const Filters = ({shopId}) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters.filters);
  const categories = useSelector(selectCategoriesByShopId(shopId));

  const handleFilter = (categoryId) => () => {
    dispatch(toggleFilter(['category', categoryId]));
  };

  return categories.length > 1 && (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '100%'
    }}>
      <Base>
        {categories.map(cat => {
          return <Chip key={cat.id} label={`${cat.icon} ${cat.name}`}
                       color={(filters && filters['category'] === cat.id) ? 'primary' : 'default'} variant="outlined"
                       onClick={handleFilter(cat.id)}/>;
        })}
      </Base>
    </Box>
  )
};

export default Filters;
