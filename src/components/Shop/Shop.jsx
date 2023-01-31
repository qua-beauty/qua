import {styled} from '@mui/material';
import Product from '../Product/Product.jsx';
import CatalogSkeleton from '../Catalog/CatalogSkeleton.jsx';
import {useCatalogStore} from '../../store/catalogStore.js';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useFilterStore} from '../../store/filtersStore.js';
import Filters from '../Filters/Filters.jsx';

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
  const {shopId} = useParams();
  const {filters} = useFilterStore();
  const {categories, shops, getFilteredCatalog, fetchCatalog} = useCatalogStore();

  useEffect(() => {
    if (categories && shops && shopId) {
      fetchCatalog(shops, categories, shopId);
    }
  }, [categories, shops]);

  const catalog = getFilteredCatalog(filters);

  return !catalog ? <CatalogSkeleton/> : (
    <>
      <Filters/>
      <Base>
      {catalog.map(product => {
        return <Product key={product.id} {...product} />;
      })}
    </Base>
    </>
  );
};

export default Shop;
