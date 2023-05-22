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
          {discountPrice ? <Box as={'span'} display={'flex'} flexDirection={'column'}>
            <Text fontSize={'11px'} textDecoration={'line-through'}>
              {price} {t('currency.LKR', {ns: 'common'})}
            </Text>
            <Text fontSize={'md'}>
              {discountPrice} {t('currency.LKR', {ns: 'common'})}
            </Text>
          </Box> : <>
            {price} {t('currency.LKR', {ns: 'common'})}
          </>}

        </Button>
      </>}

      {count >= 1 &&
        <Flex borderRadius={'16px'} overflow={'hidden'} alignItems={'center'} justifyContent={'space-between'}
              width={'100%'} background={rgba(theme.colors.telegram['200'], 0.25)}>
          <IconButton
            bg={'none'}
            color={'telegram.200'}
            onClick={onDelete} aria-label={'basket'}>
            <MinusCircle size={20} weight="bold"/>
          </IconButton>
          <Text whiteSpace={'nowrap'} fontWeight={'500'} fontSize={'md'}>
            <Text display={'inline'} color={'telegram.200'}>{count}x</Text> {discountPrice || price} {t('currency.LKR', {ns: 'common'})}</Text>
          <IconButton
            bg={'none'}
            color={'telegram.200'}
            onClick={onAdd} aria-label={'basket'}>
            <PlusCircle size={20} weight="bold"/>
          </IconButton>
        </Flex>}
    </Flex>
  );
};

export default AddToBasket;