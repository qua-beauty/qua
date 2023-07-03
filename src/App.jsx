import React, {useEffect} from 'react';
import useAuth from './hooks/useAuth.js';
import {Outlet, useParams} from 'react-router-dom';
import {useGetCategoriesQuery, useGetProductsQuery, useGetShopsQuery} from './api/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentProduct, setProductsData} from './api/slices/productSlice.js';
import {setCategoriesData} from './api/slices/categorySlice.js';
import {setCurrentShop, setShopsData} from './api/slices/shopSlice.js';
import './i18n';
import {useTranslation} from 'react-i18next';
import {Box} from '@chakra-ui/react';
import {withProfiler} from '@sentry/react';

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
      i18n.changeLanguage('ru');
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

  return (
    <Box maxW={480} m={'0 auto'}>
      <Outlet isLoading={isLoading}/>
    </Box>
  );
}

export default withProfiler(App);
