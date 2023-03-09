import React, {useEffect, useState} from 'react';
import {addProduct, deleteProduct} from '../../api/slices/basketSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Box, Flex, Heading, Text, useTheme} from '@chakra-ui/react';
import BasketCounter from '../BasketCounter.jsx';
import {borderRadius, textOverflow} from '../../globalSx.js';
import {getCategoryName, getProductCount, getShopName} from '../../api/helpers.js';
import {rgba} from '../../utils.js';

const ProductItem = ({onSelect, ...product}) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(0);
  const {name, image, price, id, category, shop} = product;
  const {basket} = useSelector(state => state.basket);
  const {t, i18n: {language: lng}} = useTranslation();
  const theme = useTheme();

  const handlePlus = () => {
    setAdded(added + 1);
    dispatch(addProduct(product));
  };

  const handleMinus = () => {
    dispatch(deleteProduct(product));
    setAdded(added - 1);
  };

  useEffect(() => {
    if (!basket) {
      setAdded(0);
    } else if(basket.length > 0) {
      const product = basket.find(p => p.id === id);
      const count = product ? product.count : 0;

      setAdded(count);
    }
  }, [basket]);

  const countInBasket = getProductCount(id);

  return (
      <Flex sx={{
        flexDirection: 'column',
        transition: '0.25s ease',
        'width': 292,
        transform: added ? 'scale(1.05)' : 'scale(1)'
      }}>
        <Box sx={{
          transition: '0.25s ease',
          'background': 'var(--chakra-colors-background-default)',
          ...borderRadius(32),
          width: '100%',
          'height': added ? 240 : 220,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {image && <img onClick={() => onSelect(product)} src={image} width={'100%'} alt=""/>}
          <BasketCounter sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: '10px',
            borderRadius: 15
          }} added={added} onAdd={handlePlus} onRemove={handleMinus} />
          <Heading p={'4px 16px 4px 16px'} background={'telegram.200'} borderRadius={'8px 20px 4px 20px'} fontSize={'lg'} fontWeight={400} position={'absolute'} bottom={'0'} left={'0'}>{getShopName(shop)}</Heading>
        </Box>
        <Flex mt={'12px'} p={'0 16px'} justifyContent={'space-between'}>
          <Text flex={'1'} color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{getCategoryName(
            category, lng)}</Text>
          <Text textAlign={'right'} fontSize={'md'} fontWeight={'400'} whiteSpace={'nowrap'}>
            1 {countInBasket > 0 ? `= ${price}` : t('product.count')}
          </Text>
        </Flex>

        <Flex mt={'4px'} p={'0 16px'}>
          <Heading sx={{
            textOverflow
          }} mr={'8px'} flex={'1'} fontSize={'lg'} fontWeight={'400'}>{name[lng]}</Heading>
          <Text textAlign={'right'} fontSize={'lg'} fontWeight={'700'} whiteSpace={'nowrap'}>
            {price * (countInBasket > 0 ? countInBasket : 1)} {t(`currency.LKR`, {ns: 'common'})}
          </Text>
        </Flex>
      </Flex>
  );
};

export default ProductItem;