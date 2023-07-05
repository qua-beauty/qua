import React, {useRef} from 'react';
import {toggleFilter} from '../../api/slices/filterSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Box, Flex, Heading, Text, useTheme} from '@chakra-ui/react';
import {rgba} from '../../utils.js';
import {borderRadius} from '../../globalSx.js';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters.filters);
  const categories = useSelector(state => state.categories.data);
  const {i18n: {language: lng}} = useTranslation();
  const theme = useTheme();
  const stickyElementRef = useRef();

  const handleFilter = (categoryId) => () => {
    dispatch(toggleFilter(['category', categoryId]));
  };

  return categories && (
    <Flex background={'linear-gradient(267.6deg, rgba(219, 197, 255, 0.64) -2.66%, rgba(255, 202, 243, 0.64) 104.89%)'}
          backdropFilter={'blur(6px)'}
          borderRadius={'16px'}
          ref={stickyElementRef}
          zIndex={'100'}
          overflowX={'auto'}
          alignItems={'stretch'}
          justifyContent={'stretch'}>
      <Flex flex={1} pt={'16px'} gap={1} flexWrap={'wrap'}  p={'12px 4px 4px'}>
        {categories.map(cat => {
          const isActive = filters && filters['category'] === cat.id;

          return (
            <Flex key={cat.id}
                  as={'button'} direction={'column'} justifyContent={'center'} alignItems={'center'} onClick={handleFilter(cat.id)}
                  pl={'0'}
                  pr={'0'}
                  mb={'12px'}
                  maxW={'24%'}
                  sx={borderRadius(16)}
                  transition={'0.225s ease-out'}
                  bg={isActive ? rgba(theme.colors.brand[200], 0.2) : 'default'}
                  textAlign={'center'}>
              <Box><img src={cat.icon} height={'56px'} alt={cat.name}/></Box>
              <Heading height={'28px'} display={'flex'} alignItems={'center'} transition={'0.125s ease-out'}
                       fontWeight={isActive ? '600' : '500'} color={isActive ? theme.colors.brand[500] : 'inherit'}
                       fontSize={'sm'} lineHeight={'1.15'}>{cat.name}</Heading>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  );
};

export default Filters;
