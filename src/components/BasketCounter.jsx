import React from 'react';
import {Button, Flex, IconButton, Text, useTheme} from '@chakra-ui/react';
import {rgba} from '../utils.js';
import {Icon} from '@chakra-ui/icons';
import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io';

const wrapSx = {
  alignItems: 'center',
  gap: '8px',
  flexDirection: 'row-reverse',
  justifyContent: 'center'
};

const BasketCounter = ({added, label, size, width, isBasket, onAdd, onDelete, sx}) => {
  const theme = useTheme();

  const iconSize = size === 'sm' ? '20px' : '28px';
  const buttonSize = size === 'sm' ? '24px' : '48px';
  const buttonP = size === 'sm' ? '2px' : '8px';
  const labelSize = size === 'sm' ? 'lg' : 'xl';

  return (
    <Flex spacing={'20px'} sx={{...wrapSx, ...sx}} width={label ? width : 'auto'}>
      <Button width={added ? 'auto' : width}
              pl={buttonP} pr={buttonP}
              borderRadius={'16px'}
              bg={theme.colors.background.paper}
              color="primary.200"
              height={buttonSize}
              onClick={onAdd} aria-label={'basket'}>
        <Icon as={IoIosAddCircle} color={'telegram.200'} fontSize={iconSize}/>
      </Button>

      {(added > 0 || isBasket) && (
        <IconButton borderRadius={'16px'}
                    bg={theme.colors.background.paper}
                    backdropBlur={'8px'}
                    pl={buttonP} pr={buttonP}
                    height={buttonSize}
                    isDisabled={added === 0}
                    color="primary.200"
                    onClick={onDelete} aria-label={'basket'}>
          <Icon as={IoIosRemoveCircle} color={'telegram.200'} fontSize={iconSize}/>
        </IconButton>
      )}
    </Flex>
  );
};

export default BasketCounter;