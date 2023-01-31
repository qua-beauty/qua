import React, {useContext, useEffect} from 'react';
import {webApp} from './telegram.js';
import useAuth from './components/Account/auth.js';
import {Outlet, useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material';
import BasketContext from './components/Basket/BasketContext.jsx';
import {useDeliveryStore} from './store/deliveryStore.js';
import {useCatalogStore} from './store/catalogStore.js';
import {useShopStore} from './store/shopStore.js';

function App() {
  useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const {basket} = useContext(BasketContext);
  const {fetchDeliveryTeams} = useDeliveryStore();
  const {categories, fetchCategories, fetchCatalog} = useCatalogStore();
  const {shops, fetchShops} = useShopStore();

  useEffect(() => {
    fetchDeliveryTeams();
    fetchShops();
    fetchCategories();
  }, []);

  useEffect(() => {
    if(categories && shops) {
      fetchCatalog(shops, categories);
    }
  }, [categories, shops]);

  useEffect(() => {
    if (!webApp) return;

    if (basket && basket.products.length > 0) {
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

  return (<Outlet />);
}

export default App;
