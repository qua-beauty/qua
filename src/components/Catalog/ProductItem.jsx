import React from 'react';
import {useTranslation} from 'react-i18next';

import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {borderRadius} from '../../globalSx.js';
import NoImage from '../NoImage.jsx';

const ProductItem = ({onSelect, ...product}) => {
  const {name, image, price, shopUsername, categoryName} = product;
  const {i18n: {language: lng}} = useTranslation();

  return (
      <Flex sx={{
        flexDirection: 'column',
        transition: '0.25s ease',
        margin: '4px 4px 16px ',
        width: 'calc(50% - 8px)'
      }}>
        <Box onClick={() => onSelect(product)} sx={{
          transition: '0.25s ease',
          ...borderRadius(12),
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
            transition: 'ease 225ms',
            top: 0,
            bottom: 0,
            width: '100%',
            background: '#000',

            '&:hover img': {
              opacity: 1,
              transform: 'scale(1.1)'
            },

            '& img': {
              transition: 'ease 225ms',
              opacity: 0.85,
              height: '100%',
              width: 'auto',
              maxWidth: 'fit-content'
            }
          }}>
            {image ? <img src={image} height={'100%'} alt=""/> : <NoImage fontSize={'56px'}/>}
          </Box>
          <Box position={'absolute'} bottom={'8px'} right={'8px'} background={'brand.200'} color={'brandText.200'} p={'2px 4px'} borderRadius={'6px'}>
            <Text fontSize={'xl'} fontWeight={'500'}>${price}</Text>
          </Box>
          <Box position={'absolute'} top={'8px'} right={'8px'} background={'whiteAlpha.800'} color={'brandText.200'} p={'2px 4px'} borderRadius={'6px'}>
            <Text fontSize={'md'} fontWeight={'500'}>200m</Text>
          </Box>
          <Box position={'absolute'} bottom={'8px'} left={'8px'} background={'whiteAlpha.800'} color={'brandText.200'} p={'2px 4px'} borderRadius={'6px'}>
            <Text fontSize={'md'} fontWeight={'500'}>{categoryName}</Text>
          </Box>
        </Box>
        <Flex direction={'column'} p={'8px'} display={'flex'}>
          <Text fontSize={'md'} fontWeight={'500'} color={'telegram.200'}>@{shopUsername}</Text>
          <Heading mt={'2px'} fontSize={'lg'} fontWeight={'500'}>{name}</Heading>
        </Flex>
      </Flex>
  );
};

export default ProductItem;