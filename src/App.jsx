import React, {useEffect, useState} from 'react';
import {Chip, styled} from '@mui/material';
import Product from './Product.jsx';
import {getCatalog} from './services.js';
import {Basket} from './Basket/index.js';

const Base = styled('div')`
  padding: 20px;
`;

const Tags = styled('div')`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  
  margin-bottom: 16px;  
  
  > * {
    margin-left: 8px;
  }
`;

const Catalog = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;


function App() {
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    getCatalog().then((data) => setCatalog(data));
  }, []);

  return (
    <Base className="App">
      <Tags>
        <Chip label="🥐 Breakfast" variant="outlined" />
        <Chip label="🥪 Main" variant="outlined" />
        <Chip label="🥗 Salads" variant="outlined" />
        <Chip label="🥤 Drinks" variant="outlined" />
      </Tags>
      <Catalog>
        {catalog && catalog.map(product => {
          return <Product key={product.id} {...product} />
        })}
      </Catalog>
      <Basket />
    </Base>
  );
}

export default App;
