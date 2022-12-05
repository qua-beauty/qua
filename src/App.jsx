import React, {useContext} from 'react';
import {Box, Chip, styled} from '@mui/material';
import Product from './Product.jsx';
import Basket from './Basket/Basket.jsx';
import CatalogContext from './Catalog/CatalogContext.jsx';
import Header from './Header.jsx';
import BasketOrder from './Basket/BasketOrder.jsx';

const Base = styled('div')`
  padding: 0 0 124px;
`;

const Tags = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;

  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 20px;

  > .MuiChip-root {
    font-size: 14px;

    + .MuiChip-root {
      margin-left: 8px;
    }
  }
`;

const Catalog = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 4px;
`;

const BasketBox = styled('div')`
  background: linear-gradient(74.19deg, #FAD0C4 9.5%, #FAD0C4 10.09%, #F0D9FF 68.93%);
  backdrop-filter: blur(2px);
  border-radius: 24px 24px 0 0;

  overflow: hidden;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  margin: 0 auto;
  max-width: 480px;
`;

function App() {
  const {catalog, category, filter, filters} = useContext(CatalogContext);

  const handleFilter = (categoryId) => () => {
    filter('category', `${categoryId}`);
  };

  return (

    <Base className="App">
      <Header/>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Tags>
          {category && category.map(cat => {
            return <Chip key={cat.id} label={`${cat.icon} ${cat.title}`}
                         color={filters['category'] === cat.id ? 'primary' : 'default'} variant="outlined"
                         onClick={handleFilter(cat.id)}/>;
          })}
        </Tags>
      </Box>
      <Catalog>
        {catalog && catalog.map(product => {
          return <Product key={product.id} {...product} />;
        })}
      </Catalog>
      <BasketBox>
        <Basket/>
        <BasketOrder/>
      </BasketBox>
    </Base>
  );
}

export default App;
