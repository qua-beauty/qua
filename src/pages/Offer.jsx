import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {webApp} from '../telegram.js';
import {useDispatch, useSelector} from 'react-redux';
import {makeBook} from '../api/slices/bookingSlice.js';
import {useTranslation} from 'react-i18next';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {Box, Button, Flex, Heading, Text, useTheme, VStack} from '@chakra-ui/react';
import {borderRadius} from '../globalSx.js';
import {getCategoryName, getProductCount} from '../api/helpers.js';
import BookButton from '../components/BookButton.jsx';
import NoImage from '../components/NoImage.jsx';
import {Percent} from '@phosphor-icons/react';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProduct = useSelector(state => state.products.current);
  const shops = useSelector(state => state.shops.data);
  const market = useSelector(state => state.shops.market);
  const currentShop = useSelector(state => state.shops.current);
  const {t, i18n: {language: lng}} = useTranslation();
  const theme = useTheme();

  const handleMakeBook = useCallback(() => {
    dispatch(makeBook(currentProduct));
    navigate('/booking');
  }, [navigate, currentProduct]);

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        console.log(currentShop);
        navigate(`/`);
      });

      webApp.MainButton.text = `Book`;
      webApp.MainButton.color = theme.colors.telegram['200'];
      webApp.MainButton.textColor = theme.colors.text.primary;
      webApp.MainButton.onClick(handleMakeBook);
      webApp.MainButton.show();
      webApp.enableClosingConfirmation();

      return () => {
        webApp && webApp.MainButton.offClick(handleMakeBook);
      }
    }
  }, [currentShop]);

  useEffect(() => {
    if (shops || market) {
      dispatch(setCurrentShop(shops.find(s => s.id === currentProduct.shop) || market));
    }
  }, [currentProduct, shops, market]);

  return (currentProduct && currentShop) ? (
    <>
      <Box p={'8px 8px 80px'} maxWidth={'480px'} m={'0 auto'}>
        <Box sx={{
          'background': 'var(--chakra-colors-background-default)',
          ...borderRadius(16),
          'width': '100%',
          paddingBottom: '100%',
          display: 'flex',
          height: 0,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            display: 'block',
            paddingTop: '100%'
          }
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            '& img': {
              height: '100%',
              width: 'auto',
              maxWidth: 'fit-content'
            }
          }}>
            {currentProduct.image ? <img style={borderRadius(16)} src={currentProduct.image} width={'100%'} alt=""/> :
              <NoImage fontSize={'96px'}/>}
          </Box>
        </Box>

        <VStack spacing={'20px'} p={'0 8px'} alignItems={'stretch'}>
          <Box>
            <Flex mt={'12px'} justifyContent={'space-between'}>
              <Text color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{getCategoryName(currentProduct.category, lng)}</Text>
              <Text>{currentProduct.shopName}</Text>
            </Flex>

            <Flex>
              <Heading mr={'8px'} flex={'1'} fontSize={'2x1'} fontWeight={'500'}>{currentProduct.name[lng]}</Heading>
              <Heading fontSize={'2x1'}>${currentProduct.price}</Heading>
            </Flex>
          </Box>

          {currentProduct.ingredients && <Box bg={'background.default'} p={'10px'} sx={{ ...borderRadius(12, 12) }}>
            <Text color={'text.secondary'}>{t('basket.ingredientsTitle')}</Text>
            <Text>{currentProduct.ingredients[lng]}</Text>
          </Box>}

          {currentProduct.about && <Box p={'10px'}>
            <Text>{currentProduct.about[lng]}</Text>
          </Box>}
        </VStack>
      </Box>
    </>
  ) : <></>
};

export default Product;