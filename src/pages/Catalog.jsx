import Filters from '../components/Catalog/Filters.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectProductsByFilters, setCurrentProduct} from '../api/slices/productSlice.js';
import {Box, Button, Container, Flex, Heading, Text, useTheme} from '@chakra-ui/react';
import React, {useCallback, useEffect} from 'react';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {useNavigate, useParams} from 'react-router-dom';
import ProductItem from '../components/Catalog/ProductItem.jsx';
import {webApp} from '../telegram.js';
import CatalogSkeleton from '../components/Catalog/CatalogSkeleton.jsx';
import {useTranslation} from 'react-i18next';
import {isWorkingTime} from '../helpers.js';
import AnimatedCard from "../components/AnimatedCard.jsx";

function Catalog() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state.shops.current);
  const filters = useSelector((state) => state.filters.filters);
  const shops = useSelector(state => state.shops.data);
  const catalog = useSelector(selectProductsByFilters(filters))
  const navigate = useNavigate();
  const {basket, count, price, currency} = useSelector(state => state.booking);
  const theme = useTheme();
  const {shopId} = useParams();
  const {t} = useTranslation();

  const handleSelect = (product) => {
    dispatch(setCurrentProduct(product));
    navigate(`/product/${product.id}`);
  }

  const navigateBasket = useCallback(() => navigate('/booking'), [navigate]);

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate(`/`);
      });
    }
  }, [currentShop]);

  useEffect(() => {
    if (!(webApp && webApp.hasOwnProperty('MainButton'))) return;

    if (basket.length > 0) {
      webApp.MainButton.text = `Bookings`;
      webApp.MainButton.color = theme.colors.telegram['200'];
      webApp.MainButton.textColor = theme.colors.text.primary;
      webApp.MainButton.onClick(navigateBasket);
      webApp.MainButton.enable();
      webApp.MainButton.show();
      webApp.enableClosingConfirmation();
    } else {
      webApp.MainButton.hide();
      webApp.disableClosingConfirmation();
    }

    return () => {
      webApp && webApp.MainButton.offClick(navigateBasket);
    }
  }, [basket, theme]);

  useEffect(() => {
    if(shops) {
      if(shopId) {
        const shop = shops.find(s => s.id === shopId);

        if (shop) {
          dispatch(setCurrentShop(shop));
        } else {
          navigate('/');
        }
      } else {
        dispatch(setCurrentShop(shops[0]));
      }
    }
  }, [shops]);

  return currentShop && catalog ? (
    <Container p={'16px'}>
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
