import React, {useRef} from 'react';
import {toggleFilter} from '../../api/slices/filterSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Flex, Heading, Text, useTheme} from '@chakra-ui/react';
import {rgba} from '../../utils.js';
import {borderRadius} from '../../globalSx.js';

const Highlights = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters.filters);
    const categories = useSelector(state => state.categories.data);
    const {i18n: {language: lng}} = useTranslation();
    const theme = useTheme();
    const stickyElementRef = useRef();


    return categories && (
        <Flex background={rgba(theme.colors.background.default, 0.87)}
              backdropFilter={'blur(6px)'}
              borderRadius={'16px'}
              height={'68px'}
              ref={stickyElementRef}
              zIndex={'100'}
              overflowX={'auto'}
              alignItems={'stretch'}
              justifyContent={'stretch'}>
        </Flex>
    );
}

export default Highlights;