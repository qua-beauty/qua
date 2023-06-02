import React from 'react';
import {useTranslation} from 'react-i18next';

import {Box, Flex, Heading, useTheme} from '@chakra-ui/react';
import {borderRadius} from '../../globalSx.js';
import NoImage from '../NoImage.jsx';

const ProductItem = ({onSelect, ...product}) => {
  const {name, image} = product;
  const {i18n: {language: lng}} = useTranslation();

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
            {image ? <img src={image} height={'100%'} alt=""/> : <NoImage fontSize={'56px'}/>}
          </Box>
        </Box>
        <Box p={'8px'}>
          <Heading mb={'8px'} justifyContent={'center'} display={'flex'} alignItems={'center'} textAlign={'center'}
                   height={'51px'} overflow={'hidden'} fontSize={'md'} fontWeight={'500'}>{name[lng]}</Heading>
        </Box>

      </Flex>
  );
};

export default ProductItem;