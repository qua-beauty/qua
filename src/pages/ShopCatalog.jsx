import {styled} from '@mui/material';
import Filters from '../components/Filters/Filters.jsx';
import Catalog from '../components/Catalog/Catalog.jsx';
import {useShopStore} from '../store/shopStore.js';
import {useEffect, useState} from 'react';
import {useCatalogStore} from '../store/catalogStore.js';
import {useFilterStore} from '../store/filterStore.js';
import {webApp} from '../telegram.js';
import {useParams} from 'react-router-dom';

const Base = styled('div')`

`;

function ShopCatalog() {
  const {shopId} = useParams();
  const {shops} = useShopStore();
  const [filteredCatalog, setFilteredCatalog] = useState(null);
  const {categories, catalog, getFilteredCatalog, fetchCatalog} = useCatalogStore();
  const {filters} = useFilterStore();

  useEffect(() => {
    if(catalog && filters) {
      setFilteredCatalog(getFilteredCatalog(filters, shopId));
    }
  }, [catalog, filters]);

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate('/');
      });
    }
  }, []);

  return (
    <Base>
      <Filters/>
      <Catalog catalog={filteredCatalog}/>
    </Base>
  );
}

export default ShopCatalog;
