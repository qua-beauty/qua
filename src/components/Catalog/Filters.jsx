import React, {useRef} from 'react';
import {toggleFilter} from '../../api/slices/filterSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategoriesByShopId} from '../../api/slices/categorySlice.js';
import {useTranslation} from 'react-i18next';
import {Flex, Heading, Text, useTheme} from '@chakra-ui/react';
import {rgba} from '../../utils.js';
import {borderRadius} from '../../globalSx.js';
import {useStickyScroll} from '../../hooks/useStickyScroll.js';

const Filters = ({shopId}) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters.filters);
  const categories = useSelector(selectCategoriesByShopId(shopId));
  const {i18n: {language: lng}} = useTranslation();
  const theme = useTheme();
  const stickyElementRef = useRef();
  const isStickyScrolled = useStickyScroll(stickyElementRef);

  const handleFilter = (categoryId) => () => {
    dispatch(toggleFilter(['category', categoryId]));
  };

  return categories.length > 1 && (
    <Flex background={rgba(theme.colors.background.paper, 0.87)}
          backdropFilter={'blur(6px)'}
          sx={borderRadius(16, 12)}
          height={'56px'}
          position={'sticky'}
          ref={stickyElementRef}
          top={'62px'}
          zIndex={'100'}
          overflowX={'auto'}
          alignItems={'stretch'}
          mb={'24px'}
          justifyContent={'stretch'}>
      <Flex flex={1} gap={1} justifyContent={'space-around'} p={'4px'}>
        {categories.map(cat => {
          const isActive = filters && filters['category'] === cat.id;

          return (
            <Flex key={cat.id}
                  as={'button'} direction={'column'} justifyContent={'center'} alignItems={'center'} onClick={handleFilter(cat.id)}
                  pl={'12px'}
                  pr={'12px'}
                  sx={borderRadius(16)}
                  transition={'0.225s ease-out'}
                  bg={isActive ? rgba(theme.colors.brand[200], 0.2) : 'default'}
                  textAlign={'center'}>
              <Text>{cat.icon}</Text>
              <Heading transition={'0.125s ease-out'} fontWeight={isActive ? '600' : '400'} color={isActive ? theme.colors.brand[500] : 'inherit'} fontSize={'xs'}>{cat.name[lng]}</Heading>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  );
};

export default Filters;
