import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {borderRadius} from '../../globalSx.js';
import BasketCounter from '../BasketCounter.jsx';
import {addProduct, deleteProduct} from '../../api/slices/basketSlice.js';
import {useDispatch} from 'react-redux';
import {getCategoryName, getProductCount} from '../../api/helpers.js';

const ProductInline = (product) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(0);
  const {name, image, price, icon, category, count} = product;
  const {t, i18n: { language: lng }} = useTranslation();

  const handlePlus = () => {
    setAdded(added + 1);
    dispatch(addProduct(product));
  };

  const handleMinus = () => {
    dispatch(deleteProduct(product));
    setAdded(added - 1);
  };

  const countInBasket = getProductCount(currentProduct?.id);


  return (
    <Flex flex={'1'} sx={borderRadius(12, 20)} mt={'10px'} padding={'10px'} bg={'background.paper'}>
      <Flex alignItems={'center'} w={'110px'} h={'80px'} overflow={'hidden'} sx={borderRadius(12)}>
        <img src={image} width={'100%'} alt=""/>
      </Flex>
      <Flex flex={'1'} direction={'column'} justifyContent={'space-between'} pl={'12px'}>
        <Box>
          <Text color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{getCategoryName(category, lng)}</Text>
          <Heading fontSize={'sm'} fontWeight={'400'} color="primary">{name[lng]}</Heading>
        </Box>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <BasketCounter size={'sm'} added={count} onAdd={handlePlus} onRemove={handleMinus} min={1} />
          <Text textAlign={'right'} fontSize={'lg'} fontWeight={'700'} whiteSpace={'nowrap'}>
            <Text as={'span'} color={'telegram.200'}>{countInBasket > 0 ? `${countInBasket}x ` : ''}</Text>
            {price * (countInBasket > 0 ? countInBasket : 1)} {t(`currency.LKR`, {ns: 'common'})}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInline;