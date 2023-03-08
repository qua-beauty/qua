import React, {useEffect, useState} from 'react';
import {addProduct, deleteProduct} from '../../api/slices/basketSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import BasketCounter from '../BasketCounter.jsx';
import {borderRadius, textOverflow} from '../../globalSx.js';
import {getCategoryName} from '../../api/helpers.js';

const ProductItem = ({onSelect, ...product}) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(0);
  const {name, image, price, id, category} = product;
  const {basket} = useSelector(state => state.basket);
  const {t, i18n: {language: lng}} = useTranslation();

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

  return (
      <Flex sx={{
        flexDirection: 'column',
        transition: '0.25s ease',
        'width': added ? 320 : 292,
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
            right: '10px',
            bottom: '10px'
          }} added={added} onAdd={handlePlus} onRemove={handleMinus} />
        </Box>
        <Flex mt={'12px'} p={'0 16px'} justifyContent={'space-between'}>
          <Text flex={'1'} color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{getCategoryName(
            category, lng)}</Text>
          <Text textAlign={'right'} fontSize={'md'} fontWeight={'400'} whiteSpace={'nowrap'}>1 {t('product.count')}</Text>
        </Flex>

        <Flex mt={'4px'} p={'0 16px'}>
          <Heading sx={{
            textOverflow
          }} mr={'8px'} flex={'1'} fontSize={'lg'} fontWeight={'400'}>{name[lng]}</Heading>
          <Text textAlign={'right'} fontSize={'lg'} fontWeight={'700'} whiteSpace={'nowrap'}>{price} {t(`currency.LKR`, {ns: 'common'})}</Text>
        </Flex>
      </Flex>
  );
};

export default ProductItem;