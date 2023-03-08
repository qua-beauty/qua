import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {webApp} from '../telegram.js';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, deleteProduct} from '../api/slices/basketSlice.js';
import {useTranslation} from 'react-i18next';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import BasketCounter from '../components/BasketCounter.jsx';
import {Box, Flex, Heading, Text, VStack} from '@chakra-ui/react';
import {borderRadius} from '../globalSx.js';

const Product = () => {
  const dispatch = useDispatch();
  const currentProduct = useSelector(state => state.products.current);
  const shops = useSelector(state => state.shops.data);
  const currentShop = useSelector(state => state.shops.current);
  const {basket} = useSelector(state => state.basket);
  const {productId} = useParams();
  const navigate = useNavigate();
  const {t, i18n: {language: lng}} = useTranslation();

  const [added, setAdded] = useState(0);

  const handlePlus = () => {
    setAdded(added + 1);
    dispatch(addProduct(currentProduct));
  };

  const handleMinus = () => {
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
        navigate(`/shop/${currentShop.id}`);
      });
    }
  }, [currentProduct]);

  useEffect(() => {
    if (shops) {
      dispatch(setCurrentShop(shops[0]));
    }
  }, [shops]);

  return (currentProduct && currentShop) ? (
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
      </Box>

      <VStack spacing={'20px'} p={'0 10px'} alignItems={'stretch'}>
        <Box p={'0 10px'}>
          <Flex mt={'12px'} justifyContent={'space-between'}>
            <Text color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{currentProduct.category}</Text>
            <Text fontSize={'md'} fontWeight={'400'} whiteSpace={'nowrap'}>1 шт</Text>
          </Flex>

          <Flex mt={'4px'}>
            <Heading mr={'8px'} flex={'1'} fontSize={'lg'} fontWeight={'400'}>{currentProduct.name[lng]}</Heading>
            <Text textAlign={'right'} fontSize={'lg'} fontWeight={'700'} whiteSpace={'nowrap'}>{currentProduct.price} {t(`currency.LKR`,
              {ns: 'common'})}</Text>
          </Flex>
        </Box>

        <BasketCounter width={'100%'} label={'Добавить'} added={added} onAdd={handlePlus} onRemove={handleMinus}/>

        {currentProduct.ingredients && <Box bg={'background.paper'} p={'10px'} sx={{ ...borderRadius(12, 12) }}>
          <Text color={'text.secondary'}>{t('basket.ingredientsTitle')}</Text>
          <Text>{currentProduct.ingredients[lng]}</Text>
        </Box>}

        {currentProduct.about && <Box p={'10px'}>
          <Text>{currentProduct.about[lng]}</Text>
        </Box>}
      </VStack>
    </Box>
  ) : <></>
};

export default Product;