import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {borderRadius} from '../../globalSx.js';
import BasketCounter from '../BasketCounter.jsx';
import {addProduct, deleteProduct} from '../../api/slices/basketSlice.js';
import {useDispatch} from 'react-redux';

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

  useEffect(() => {
    if(product) {

    }
  }, [product])

  return (
    <Flex flex={'1'} sx={borderRadius(12, 20)} mt={'10px'} padding={'10px'} bg={'background.paper'}>
      <Flex alignItems={'center'} w={'110px'} h={'80px'} overflow={'hidden'} sx={borderRadius(12)}>
        <img src={image} width={'100%'} alt=""/>
      </Flex>
      <Flex flex={'1'} direction={'column'} justifyContent={'space-between'} pl={'12px'}>
        <Box>
          <Text color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{category}</Text>
          <Heading fontSize={'sm'} fontWeight={'400'} color="primary">{name[lng]}</Heading>
        </Box>
        <Flex alignItems={'center'} justifyContent={'flex-end'}>
          <BasketCounter size={'sm'} added={count} onAdd={handlePlus} onRemove={handleMinus} />
          <Text ml={'16px'} fontSize={'lg'} fontWeight={'700'}>{price} {t(`currency.LKR`, { ns: 'common' })}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInline;