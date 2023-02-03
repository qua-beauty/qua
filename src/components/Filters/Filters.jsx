import React, {useEffect, useState} from 'react';
import {Box, Chip, styled} from '@mui/material';
import FiltersSkeleton from './FiltersSkeleton.jsx';
import {useCatalogStore} from '../../store/catalogStore.js';
import {useFilterStore} from '../../store/filterStore.js';

const Base = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;
  
  padding: 8px 16px;

  > .MuiChip-root {
    font-size: 14px;

    + .MuiChip-root {
      margin-left: 8px;
    }
  }
`;

const Filters = ({shopId}) => {
  const [actualCategories, setActualCategories] = useState(null);
  const {catalog, categories} = useCatalogStore();
  const {filters, toggleFilter} = useFilterStore();

  const handleFilter = (categoryId) => () => {
    toggleFilter('category', `${categoryId}`);
  };

  useEffect(() => {
    if(categories && catalog) {
      const actualCategories = categories.filter(category => {
        return catalog.some(item => {
          return item.shopId === shopId && item.category.some(cat => cat === category.id)
        });
      })

      setActualCategories(actualCategories.length === 1 ? [] : actualCategories);
    }
  }, [categories, catalog])

  return !actualCategories ? <FiltersSkeleton /> : (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Base>
        {actualCategories.sort((a, b) => a.order - b.order).map(cat => {
          return <Chip key={cat.id} label={`${cat.icon} ${cat.title}`}
                       color={filters['category'] === cat.id ? 'primary' : 'default'} variant="outlined"
                       onClick={handleFilter(cat.id)}/>;
        })}
      </Base>
    </Box>
  );
};

export default Filters;
