import {styled} from '@mui/material';
import Product from '../Product/Product.jsx';
import CatalogSkeleton from './CatalogSkeleton.jsx';
import {useEffect} from 'react';
import {useCatalogStore} from '../../store/catalogStore.js';
import {useFilterStore} from '../../store/filtersStore.js';

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

const Catalog = () => {
  const {categories, shops, getFilteredCatalog, fetchCatalog} = useCatalogStore();
  const {filters} = useFilterStore();

  useEffect(() => {
    if(categories && shops) {
      fetchCatalog(shops, categories);
    }
  }, [categories, shops]);

  const catalog = getFilteredCatalog(filters);

  return catalog.length === 0 ? <CatalogSkeleton /> : (
    <Base>
      {catalog.map(product => {
        return <Product key={product.id} {...product} />;
      })}
    </Base>
  );
};

export default Catalog;
