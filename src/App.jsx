import React, {useEffect} from 'react';
import {webApp} from './telegram.js';
import useAuth from './hooks/useAuth.js';
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';
import {BottomNavigation, Button, useTheme} from '@mui/material';
import AppLoader from './components/AppLoader.jsx';
import {useGetCategoriesQuery, useGetProductsQuery, useGetShopsQuery} from './api/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentProduct, setProductsData} from './api/slices/productSlice.js';
import {setCategoriesData} from './api/slices/categorySlice.js';
import {setCurrentShop, setShopsData} from './api/slices/shopSlice.js';

function App() {
  useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const {productId, shopId} = useParams();
  const {basket} = useSelector(state => state.basket);

  const {data: shops, isLoading: isShopsLoading} = useGetShopsQuery();
  const {data: products, isLoading: isProductsLoading} = useGetProductsQuery();
  const {data: categories, isLoading: isCategoriesLoading} = useGetCategoriesQuery();

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

  useEffect(() => {
    if (!webApp) return;

    if (basket.length > 0) {
      webApp.MainButton.text = 'Корзина 🧺';
      webApp.MainButton.color = theme.palette.primary.main;
      webApp.MainButton.textColor = theme.palette.common.white;
      webApp.MainButton.onClick(() => {
        navigate('/basket');
      });
      webApp.MainButton.show();
      webApp.enableClosingConfirmation();
    } else {
      webApp.MainButton.hide();
      webApp.disableClosingConfirmation();
    }
  }, [basket]);

  const isLoading = isCategoriesLoading || isProductsLoading || isShopsLoading;

  if (isLoading) return <AppLoader/>;

  return (
    <>
      <Outlet/>
      {import.meta.env.DEV && (
        <BottomNavigation>
          <Button component={Link} to={'/basket'}>Basket</Button>
        </BottomNavigation>
      )}
    </>
  );
}

export default App;
