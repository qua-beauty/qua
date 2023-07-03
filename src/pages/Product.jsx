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
      <Box p={'0 0 80px'} maxWidth={'480px'} m={'0 auto'}>
        <Box sx={{
          height: 400,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#edab9b',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'relative',
            zIndex: 2,
            width: '300px',
            height: '300px',

            '& img': {
              height: '100%',
              width: 'auto',
              maxWidth: 'fit-content'
            }
          }}>
            {currentProduct.image ? <img style={borderRadius(16)} src={currentProduct.image} width={'100%'} alt=""/> :
              <NoImage fontSize={'96px'}/>}
            <Box position={'absolute'} bottom={'8px'} left={'8px'} background={'whiteAlpha.800'} color={'brandText.200'} p={'2px 4px'} borderRadius={'6px'}>
              <Text fontSize={'md'} fontWeight={'500'}>{currentProduct.categoryName}</Text>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `url(${currentProduct.image}) no-repeat center`,
            filter: 'blur(20px)',
            position: 'absolute',
            zIndex: 1,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }} />
        </Box>

        <VStack spacing={'20px'} p={'0 8px'} alignItems={'stretch'}>
          <Box>
            <Flex mt={'12px'} justifyContent={'space-between'} alignItems={'center'}>
              <Heading fontSize={'4x1'} fontWeight={'500'}>{currentProduct.shopName}</Heading>
              <Box background={'telegram.200'} color={'white'} p={'2px 4px 0'} borderRadius={'6px'}>
                <Text fontSize={'2x1'} fontWeight={'600'}>${currentProduct.price}</Text>
              </Box>
            </Flex>

            <Flex>

            </Flex>
          </Box>

          {currentProduct.ingredients && <Box bg={'background.default'} p={'10px'} sx={{ ...borderRadius(12, 12) }}>
            <Text color={'text.secondary'}>{t('basket.ingredientsTitle')}</Text>
            <Text>{currentProduct.ingredients}</Text>
          </Box>}

          {currentProduct.about && <Box p={'10px'}>
            <Text>{currentProduct.about}</Text>
          </Box>}
        </VStack>
      </Box>
    </>
  ) : <></>
};

export default Product;