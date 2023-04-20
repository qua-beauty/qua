import React, {useEffect, useState} from 'react';
import {addProduct, deleteProduct} from '../../api/slices/basketSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Box, Flex, Heading} from '@chakra-ui/react';
import {borderRadius} from '../../globalSx.js';
import {getProductCount} from '../../api/helpers.js';
import AddToBasket from '../AddToBasket.jsx';
import NoImage from '../NoImage.jsx';

const ProductItem = ({onSelect, ...product}) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(0);
  const {name, image, price, id} = product;
  const {basket} = useSelector(state => state.basket);
  const {i18n: {language: lng}} = useTranslation();

  const handleAddProduct = () => {
    setAdded(added + 1);
    dispatch(addProduct(product));
  };

  const handleDeleteProduct = () => {
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
        margin: '4px',
        width: 'calc(50% - 8px)',
        borderRadius: '16px',
        background: 'var(--chakra-colors-background-default)',
      }}>
        <Box onClick={() => onSelect(product)} sx={{
          transition: '0.25s ease',
          ...borderRadius(16),
          paddingBottom: '100%',
          display: 'flex',
          height: 0,
          alignItems: 'center',
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
            {image ? <img src={image} height={'100%'} alt=""/> : <NoImage fontSize={'56px'} />}
          </Box>
        </Box>
        <Box p={'8px'}>
          <Heading mb={'8px'} justifyContent={'center'} display={'flex'} alignItems={'center'} textAlign={'center'}
                   height={'51px'} overflow={'hidden'} fontSize={'md'} fontWeight={'500'}>{name[lng]}</Heading>

          <AddToBasket price={price} count={countInBasket} onAdd={handleAddProduct} onDelete={handleDeleteProduct} />
        </Box>

      </Flex>
  );
};

export default ProductItem;