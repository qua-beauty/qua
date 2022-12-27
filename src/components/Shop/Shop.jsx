import React, {useContext} from 'react';
import {styled} from '@mui/material';
import Product from '../Product/Product.jsx';
import CatalogSkeleton from '../Catalog/CatalogSkeleton.jsx';
import CatalogContext from '../Catalog/CatalogContext.jsx';

const Base = styled('div')`
  padding: 16px 4px 96px;

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

const Shop = () => {
  const {catalog, catalogLoaded} = useContext(CatalogContext);

  return !catalogLoaded ? <CatalogSkeleton /> : (
    <Base>
      {catalog.map(product => {
        return <Product key={product.id} {...product} />;
      })}
    </Base>
  );
};

export default Shop;
