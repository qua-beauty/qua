import React, {useEffect} from 'react';
import {webApp} from './telegram.js';
import useAuth from './hooks/useAuth.js';
import {Link, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useGetCategoriesQuery, useGetProductsQuery, useGetShopsQuery} from './api/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentProduct, setProductsData} from './api/slices/productSlice.js';
import {setCategoriesData} from './api/slices/categorySlice.js';
import {setCurrentShop, setShopsData} from './api/slices/shopSlice.js';
import './i18n';
import {useTranslation} from 'react-i18next';
import Header from './components/Header.jsx';
import {Box, Button, Container, useTheme} from '@chakra-ui/react';

function App() {
  useAuth();
  const dispatch = useDispatch();
  const {productId, shopId} = useParams();
  const {i18n} = useTranslation();

  const user = useSelector(state => state.user.data);
  const {data: shops, isLoading: isShopsLoading} = useGetShopsQuery();
  const {data: products, isLoading: isProductsLoading} = useGetProductsQuery();
  const {data: categories, isLoading: isCategoriesLoading} = useGetCategoriesQuery();

  useEffect(() => {
    if (user && user.language) {
      i18n.changeLanguage(user.language);
    }
  }, [user])

  useEffect(() => {
    if (shops) {
      dispatch(setShopsData(shops));

      if (shopId) {
        const shop = shops.find(s => s.id === shopId);
        dispatch(setCurrentShop(shop));
      }
    }
  }, [shops]);

  useEffect(() => {
    if (categories) {
      dispatch(setCategoriesData(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (products) {
      dispatch(setProductsData(products));

      if (productId) {
        const product = products.find(p => p.id === productId);
        dispatch(setCurrentProduct(product));
      }
    }
  }, [products]);

  const isLoading = isCategoriesLoading || isProductsLoading || isShopsLoading;
  const location = useLocation();
  const isBasket = location.pathname.includes('/basket');

  return (
    <Box>
      {!isBasket && <Header/>}

      <Container maxW={'560px'} p={'0 8px'} m={'0 auto'}>
        <Outlet isLoading={isLoading}/>
      </Container>

      {/*{!isBasket && <Footer />}*/}
    </Box>
  );
}

export default App;
