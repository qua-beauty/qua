import Filters from '../components/Catalog/Filters.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectProductsByShop, setCurrentProduct} from '../api/slices/productSlice.js';
import {Box, Button, Flex, useTheme} from '@chakra-ui/react';
import React, {useCallback, useEffect} from 'react';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {Link, useNavigate} from 'react-router-dom';
import ProductItem from '../components/Catalog/ProductItem.jsx';
import {webApp} from '../telegram.js';
import CatalogSkeleton from '../components/Catalog/CatalogSkeleton.jsx';
import {useTranslation} from "react-i18next";
import {getProductCount} from "../api/helpers.js";

function Catalog() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state.shops.current);
  const filters = useSelector((state) => state.filters.filters);
  const shops = useSelector(state => state.shops.data);
  const catalog = useSelector(selectProductsByShop(currentShop?.id, filters));
  const navigate = useNavigate();
  const {basket, count, price, currency} = useSelector(state => state.basket);
  const theme = useTheme();
  const {t} = useTranslation();

  const handleSelect = (product) => {
    dispatch(setCurrentProduct(product));
    navigate(`product/${product.id}`);
  }

  useEffect(() => {
    if(shops) {
      dispatch(setCurrentShop(shops[0]))
    }
  }, [shops])

  if (webApp) {
    webApp.BackButton.hide();
  }

  const navigateBasket = useCallback(() => navigate('/basket'), [navigate]);

  useEffect(() => {
    if (!webApp) return;

    if (basket.length > 0) {
      webApp.MainButton.text = `${t('basket.viewButton')} ${count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}`;
      webApp.MainButton.color = theme.colors.telegram[200];
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
  }, [basket]);

  return currentShop ? (
    <>
      <Box pb={'72px'} position={'relative'}>
        <Flex alignItems={'center'} gap={10} direction={'column'}>
          {catalog.map(product => {
            return <ProductItem onSelect={() => handleSelect(product)} key={product.id} {...product} />;
          })}
        </Flex>
        <Filters shopId={currentShop.id}/>
      </Box>
      {import.meta.env.DEV && (
        <Button as={Link} to={'/basket'}>{t('basket.viewButton')} {count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}</Button>
      )}
    </>
  ) : <CatalogSkeleton />;
}

export default Catalog;
