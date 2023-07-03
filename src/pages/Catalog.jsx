import Filters from '../components/Catalog/Filters.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectProductsByFilters, setCurrentProduct} from '../api/slices/productSlice.js';
import {Box, Container, Flex, useTheme} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ProductItem from '../components/Catalog/ProductItem.jsx';
import {webApp} from '../telegram.js';
import CatalogSkeleton from '../components/Catalog/CatalogSkeleton.jsx';

function Catalog() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);
  const catalog = useSelector(selectProductsByFilters(filters))
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSelect = (product) => {
    dispatch(setCurrentProduct(product));
    navigate(`/product/${product.id}`);
  }

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.hide();
      webApp.MainButton.hide();
    }
  }, []);

  const gradient = {
    dark: 'linear-gradient(180deg, #1D2122 0%, #1E1A21 59.37%, #222119 100%)',
    light: 'linear-gradient(180deg, #ECF9FF 0%, #F8F2FF59.37%, #FFFBD3 100%)'
  }

  return catalog ? (
    <Container p={'16px'} background={gradient[theme.colorMode]}>
      <Filters />
      <Box mt={'16px'} pb={'72px'} position={'relative'}>
        <Flex alignItems={'center'} m={'0 -4px'} flexWrap={'wrap'}>
          {catalog?.map(product => {
            return <ProductItem onSelect={() => handleSelect(product)} key={product.id} {...product} />;
          })}
        </Flex>
      </Box>
    </Container>
  ) : <CatalogSkeleton />;
}

export default Catalog;
