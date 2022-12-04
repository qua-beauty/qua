import React, {useContext, useEffect} from 'react';
import {Chip, styled} from '@mui/material';
import Product from './Product.jsx';
import Basket from './Basket/Basket.jsx';
import CatalogContext from './Catalog/CatalogContext.jsx';
import Header from './Header.jsx';
import { signInAnonymously } from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.js';
import BasketOrder from './Basket/BasketOrder.jsx';

const Base = styled('div')`
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
  const [user, loading] = useAuthState(auth);
  const {catalog, category, filter, filters} = useContext(CatalogContext);

  const handleFilter = (categoryId) => () => {
    filter('category', `${categoryId}`);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) {
      signInAnonymously(auth)
        .then(() => {
          console.log('signed');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    }
  }, [user])

  return (
    <Base className="App">
      <Header />
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
      <BasketBox>
        <Basket/>
        <BasketOrder />
      </BasketBox>
    </Base>
  );
}

export default App;
