import React, {useContext, useEffect} from 'react';
import {webApp} from './telegram.js';
import useAuth from './components/Account/auth.js';
import {Outlet, useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material';
import BasketContext from './components/Basket/BasketContext.jsx';
import {useDeliveryStore} from './store/deliveryStore.js';
import {useCatalogStore} from './store/catalogStore.js';

function App() {
  useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const {basket} = useContext(BasketContext);
  const deliveryStore = useDeliveryStore();
  const catalogStore = useCatalogStore();

  useEffect(() => {
    deliveryStore.fetchDeliveryTeams();
    catalogStore.fetchShops();
    catalogStore.fetchCategories();
  }, []);

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
