import React, {useContext} from 'react';
import {styled} from '@mui/material';
import Product from './Product.jsx';
import CatalogContext from './CatalogContext.jsx';
import CatalogSkeleton from './CatalogSkeleton.jsx';
import FiltersSkeleton from './FiltersSkeleton.jsx';

const Base = styled('div')`
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

const Catalog = () => {
  const {catalog} = useContext(CatalogContext);

  if (catalog.length === 0) {
    return <CatalogSkeleton/>;
  }

  return catalog.length === 0 ? <CatalogSkeleton /> : (
    <Base>
      {catalog.map(product => {
        return <Product key={product.id} {...product} />;
      })}
    </Base>
  );
};

export default Catalog;
