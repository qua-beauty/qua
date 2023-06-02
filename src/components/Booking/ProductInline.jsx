import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {borderRadius} from '../../globalSx.js';
import {getCategoryName, getProductCount} from '../../api/helpers.js';
import NoImage from '../NoImage.jsx';

const ProductInline = ({product}) => {
  const {name, image, price, discountPrice, category, isDeleted} = product;
  const {t, i18n: { language: lng }} = useTranslation();

  const countInBasket = getProductCount(product?.id);

  return (
    <Flex flex={'1'} sx={borderRadius(12, 20)} mt={'10px'} padding={'10px'} bg={isDeleted ? 'background.default' : 'background.paper'} opacity={isDeleted ? '0.8' : '1'}>
      <Flex alignItems={'center'} justifyContent={'center'} background={'background.default'} w={'110px'} h={'80px'} overflow={'hidden'} sx={borderRadius(12)}>
        {image ? <img src={image} height={'100%'} alt=""/> : <NoImage fontSize={'36px'} />}
      </Flex>
      <Flex flex={'1'} direction={'column'} justifyContent={'space-between'} pl={'12px'}>
        <Box>
          <Text textDecoration={isDeleted ? 'line-through' : 'none'} color={'text.secondary'} fontSize={'md'} fontWeight={'400'}>{getCategoryName(category, lng)}</Text>
          <Heading textDecoration={isDeleted ? 'line-through' : 'none'} fontSize={'sm'} fontWeight={'400'} color="primary">{name[lng]}</Heading>
        </Box>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text textDecoration={isDeleted ? 'line-through' : 'none'} textAlign={'right'} fontSize={'lg'} fontWeight={'700'} whiteSpace={'nowrap'}>
            <Text as={'span'} color={'telegram.200'}>{countInBasket > 0 ? `${countInBasket}x ` : ''}</Text>
            {(discountPrice || price) * (countInBasket > 0 ? countInBasket : 1)} {t(`currency.USD`, {ns: 'common'})}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInline;