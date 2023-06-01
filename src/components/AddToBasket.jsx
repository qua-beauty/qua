import React from 'react';
import {Box, Button, Flex, IconButton, Text, useTheme} from '@chakra-ui/react';
import {rgba} from '../utils.js';
import {MinusCircle, PlusCircle} from '@phosphor-icons/react';
import {useTranslation} from 'react-i18next';

const AddToBasket = ({price, discountPrice, discount, count, onAdd, onDelete}) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <Flex>
      {count < 1 && <>
        <Button onClick={onAdd} fontWeight={'500'} borderRadius={'12px'} width={'100%'}
                background={rgba(theme.colors.telegram['200'], 0.2)} color={'telegram.200'}
                leftIcon={<PlusCircle size={20} weight="bold"/>}>
          Book
        </Button>
      </>}

      {count >= 1 &&
        <Button onClick={onDelete} fontWeight={'500'} borderRadius={'12px'} width={'100%'}
                background={rgba(theme.colors.telegram['200'], 0.2)} color={'telegram.200'}
                leftIcon={<MinusCircle size={20} weight="bold"/>}>
          Unbook
        </Button>}
    </Flex>
  );
};

export default AddToBasket;