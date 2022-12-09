import React, {useContext, useEffect} from 'react';
import {Box, Chip, styled} from '@mui/material';
import Product from './Product.jsx';
import Basket from './Basket/Basket.jsx';
import CatalogContext from './Catalog/CatalogContext.jsx';
import Header from './Header.jsx';
import BasketOrder from './Basket/BasketOrder.jsx';
import Footer from './Footer.jsx';
import {webApp} from './telegramUtils.js';
import useAuth from './Account/auth.js';

const Base = styled('div')`
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled('main')`
`;

const Tags = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;

  margin-top: 20px;
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
  padding: 0 5px 96px;
  
  max-width: 800px;
  margin: -10px auto 0;
  
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;

  @media (min-width: 560px) {
    grid-template-columns: 33% 33% 33%;
  }
  
  @media (min-width: 720px) {
    grid-template-columns: 25% 25% 25% 25%;
  }
`;

const BasketBox = styled('div')`
  background: linear-gradient(74.19deg, #FAD0C4 9.5%, #FAD0C4 10.09%, #F0D9FF 68.93%);
  backdrop-filter: blur(2px);
  border-radius: 24px 24px 0 0;

  z-index: 100;
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

  useEffect(() => {
    useAuth();
  }, [])

  return (

    <Base className="App">
      {!webApp && <Header />}

      <Main>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Tags>
            {category && category.sort((a,b) => a.order - b.order ).map(cat => {
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
      </Main>
      <BasketBox>
        <Basket/>
        <BasketOrder/>
      </BasketBox>
      {!webApp && <Footer />}
    </Base>
  );
}

export default App;
