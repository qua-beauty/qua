import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {webApp} from '../telegram.js';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, deleteProduct} from '../api/slices/basketSlice.js';
import {useTranslation} from 'react-i18next';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import BasketCounter from '../components/BasketCounter.jsx';
import {Box, Button, Flex, Heading, Text, useTheme, VStack} from '@chakra-ui/react';
import {borderRadius} from '../globalSx.js';
import {getCategoryName, getProductCount} from '../api/helpers.js';

const Product = () => {
  const dispatch = useDispatch();
  const currentProduct = useSelector(state => state.products.current);
  const shops = useSelector(state => state.shops.data);
  const currentShop = useSelector(state => state.shops.current);
  const {productId} = useParams();
  const navigate = useNavigate();
  const {t, i18n: {language: lng}} = useTranslation();
  const {basket, count, price, currency} = useSelector(state => state.basket);
  const theme = useTheme();

  const [added, setAdded] = useState(0);

  const handleAddProduct = () => {
    setAdded(added + 1);
    dispatch(addProduct(currentProduct));
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(currentProduct));
    setAdded(added - 1);
  };

  useEffect(() => {
    if (currentProduct) {
      if (!basket) {
        setAdded(0);
      } else if (basket.length > 0) {
        const product = basket.find(p => p.id === productId);
        const count = product ? product.count : 0;

        setAdded(count);
      }
    }
  }, [basket, currentProduct]);


  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate(`/`);
      });
    }
  }, [currentProduct]);

  useEffect(() => {
    if (shops) {
      dispatch(setCurrentShop(shops[0]));
    }
  }, [shops]);

  const countInBasket = getProductCount(currentProduct?.id);
  const navigateBasket = useCallback(() => navigate('/basket'), [navigate]);

  useEffect(() => {
    if (!webApp) return;

    if (basket.length > 0) {
      webApp.MainButton.text = `${t('basket.viewButton')} ${count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}`;
      webApp.MainButton.color = theme.colors.telegram[200];
      webApp.MainButton.textColor = theme.colors.text.primary;
      webApp.MainButton.onClick(navigateBasket);
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

  return (currentProduct && currentShop) ? (
    <>
      <Box pb={'80px'}>
        <Box sx={{
          'background': 'var(--chakra-colors-background-default)',
          ...borderRadius(32),
          'width': '100%',
          'height': 280,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {currentProduct.image && <img style={borderRadius(32)} src={currentProduct.image} width={'100%'} alt=""/>}
          <BasketCounter sx={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            left: 'auto'
          }} label={t('basket.addButton')} added={added} onAdd={handleAddProduct} onDelete={handleDeleteProduct}/>
        </Box>

        <VStack spacing={'20px'} p={'0 10px'} alignItems={'stretch'}>
          <Box p={'0 10px'}>
            <Flex mt={'12px'} justifyContent={'space-between'}>
              <Text color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{getCategoryName(currentProduct.category, lng)}</Text>
              <Text textAlign={'right'} fontSize={'lg'} fontWeight={'700'} whiteSpace={'nowrap'}>
                <Text as={'span'} color={'telegram.200'}>{countInBasket > 0 ? `${countInBasket}x ` : ''}</Text>
                {currentProduct.price * (countInBasket > 0 ? countInBasket : 1)} {t(`currency.LKR`, {ns: 'common'})}
              </Text>
            </Flex>

            <Flex mt={'4px'}>
              <Heading mr={'8px'} flex={'1'} fontSize={'lg'} fontWeight={'400'}>{currentProduct.name[lng]}</Heading>
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

      {import.meta.env.DEV && (
        <Button as={Link} to={'/basket'}>{t('basket.viewButton')} {count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}</Button>
      )}
    </>
  ) : <></>
};

export default Product;