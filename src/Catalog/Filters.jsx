import React, {useContext} from 'react';
import {Box, Chip, styled} from '@mui/material';
import CatalogContext from './CatalogContext.jsx';
import FiltersSkeleton from './FiltersSkeleton.jsx';

const Base = styled('div')`
  background: #fff;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;
  
  padding: 20px;

  > .MuiChip-root {
    font-size: 14px;

    + .MuiChip-root {
      margin-left: 8px;
    }
  }
`;

const Filters = () => {
  const {category, filter, filters} = useContext(CatalogContext);

  const handleFilter = (categoryId) => () => {
    filter('category', `${categoryId}`);
  };

  return category.length === 0 ? <FiltersSkeleton /> : (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>

      <Base>
        {category.sort((a, b) => a.order - b.order).map(cat => {
          return <Chip key={cat.id} label={`${cat.icon} ${cat.title}`}
                       color={filters['category'] === cat.id ? 'primary' : 'default'} variant="outlined"
                       onClick={handleFilter(cat.id)}/>;
        })}
      </Base>
    </Box>
  );
};

export default Filters;
