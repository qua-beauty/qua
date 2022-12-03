import React, {useContext} from 'react';
import {Chip, styled} from '@mui/material';
import Product from './Product.jsx';
import Basket from './Basket/Basket.jsx';
import CatalogContext from './Catalog/CatalogContext.jsx';

const Base = styled('div')`
  padding: 20px;
`;

const Tags = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  overflow: auto;

  margin-bottom: 16px;

  > .MuiChip-root {
    margin-left: 8px;
  }
`;

const Catalog = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


function App() {
  const {catalog, category, filter, filters} = useContext(CatalogContext);

  const handleFilter = (categoryId) => () => {
    filter('category', `${categoryId}`);
  }

  return (
    <Base className="App">
      <Tags>
        {category && category.map(cat => {
          return <Chip key={cat.id} label={`${cat.icon} ${cat.title}`} color={filters['category'] === cat.id ? 'primary' : 'default'} variant="outlined" onClick={handleFilter(cat.id)}/>
        })}
      </Tags>
      <Catalog>
        {catalog && catalog.map(product => {
          return <Product key={product.id} {...product} />;
        })}
      </Catalog>
      <Basket/>
    </Base>
  );
}

export default App;
