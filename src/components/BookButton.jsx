import React from 'react';
import {Box, Button, Flex, IconButton, Text, useTheme} from '@chakra-ui/react';
import {rgba} from '../utils.js';
import {MinusCircle, PlusCircle} from '@phosphor-icons/react';
import {useTranslation} from 'react-i18next';
import {addProduct} from '../api/slices/bookingSlice.js';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const BookButton = ({ product }) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBook = () => {
    dispatch(addProduct(product));
    navigate('/booking');
  }

  return (
    <Flex>
      <Button onClick={handleBook} fontWeight={'500'} borderRadius={'12px'} width={'100%'}
              background={rgba(theme.colors.telegram['200'], 0.2)} color={'telegram.200'}
              leftIcon={<PlusCircle size={20} weight="bold"/>}>
        Book
      </Button>
    </Flex>
  );
};

export default BookButton;