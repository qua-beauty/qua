import Filters from '../components/Catalog/Filters.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectProductsByShop, setCurrentProduct} from '../api/slices/productSlice.js';
import {Box, Button, Container, Flex, Heading, Text, useTheme} from '@chakra-ui/react';
import React, {useCallback, useEffect} from 'react';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ProductItem from '../components/Catalog/ProductItem.jsx';
import {webApp} from '../telegram.js';
import CatalogSkeleton from '../components/Catalog/CatalogSkeleton.jsx';
import {useTranslation} from "react-i18next";
import {isWorkingTime} from '../helpers.js';
import {Offline, Online} from '../components/Status.jsx';

function Catalog() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state.shops.current);
  const filters = useSelector((state) => state.filters.filters);
  const shops = useSelector(state => state.shops.data);
  const catalog = useSelector(selectProductsByShop(currentShop?.id, filters));
  const navigate = useNavigate();
  const {basket, count, price, currency} = useSelector(state => state.basket);
  const theme = useTheme();
  const {shopId} = useParams();
  const {t} = useTranslation();

  const handleSelect = (product) => {
    dispatch(setCurrentProduct(product));
    navigate(`/product/${product.id}`);
  }

  const navigateBasket = useCallback(() => navigate('/basket'), [navigate]);

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
      webApp.MainButton.text = `${t('basket.viewButton')} ${count > 0 ? `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})` : ''}`;
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

        if(shop) {
          dispatch(setCurrentShop(shop))
        } else {
          navigate('/')
        }
      } else {
        dispatch(setCurrentShop(shops[0]))
      }
    }
  }, [shops])

  return currentShop ? (
    <Container p={'16px'}>
      <Flex mt={'8px'} justifyContent={'space-between'}>
        <Box>
          <Heading fontSize={'2x1'}>{currentShop.name}</Heading>
          <Flex mt={'4px'} alignItems={'baseline'} gap={'6px'}>
            {isWorkingTime(currentShop.startTime, currentShop.endTime) ? <>
              <Online /> Работаем
            </> : <>
              <Offline /> Отдыхаем
            </>}
            <Text fontWeight={'500'} fontSize={'md'}>{currentShop.workTime}</Text>
          </Flex>
        </Box>
        <Box>
          {currentShop.logo && <Box width={'56px'} height={'56px'} borderRadius={'50%'} overflow={'hidden'}>
            <img src={currentShop.logo} width={'100%'} alt=""/>
          </Box>}
        </Box>
      </Flex>
      <Box mt={'16px'} pb={'72px'} position={'relative'}>
        <Flex alignItems={'center'} m={'0 -4px'} flexWrap={'wrap'}>
          {catalog.map(product => {
            return <ProductItem onSelect={() => handleSelect(product)} key={product.id} {...product} />;
          })}
        </Flex>
        <Filters shopId={currentShop.id}/>
      </Box>
      {import.meta.env.DEV && (
        <Button as={Link} to={'/basket'}>{t('basket.viewButton')} {count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}</Button>
      )}
    </Container>
  ) : <CatalogSkeleton />;
}

export default Catalog;
