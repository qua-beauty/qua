import React from 'react';
import {Button, Flex, IconButton, Text, useTheme} from '@chakra-ui/react';
import {rgba} from '../utils.js';
import {Icon} from '@chakra-ui/icons';
import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io';

const wrapSx = {
  alignItems: 'center',
  gap: 0,
  flexDirection: 'row-reverse',
  justifyContent: 'center'
};

const BasketCounter = ({added, label, size, width, onAdd, onRemove, sx}) => {
  const theme = useTheme();

  const iconSize = size === 'sm' ? '20px' : '28px';
  const buttonSize = size === 'sm' ? '28px' : '48px';
  const buttonP = size === 'sm' ? '4px' : '8px';

  return (
    <Flex sx={{...wrapSx, ...sx}} width={label ? width : 'auto'}>
      <Button width={added ? 'auto' : width}
              pl={buttonP} pr={buttonP}
              borderRadius={'16px'}
              bg={rgba(theme.colors.telegram[200], 0.2)}
              color="primary.200"
              height={buttonSize}
              onClick={onAdd} aria-label={'basket'}>
        <Icon as={IoIosAddCircle} color={'telegram.200'} fontSize={iconSize}/>
        {(label && !added) && <Text pr={'8px'} ml={'12px'} fontSize={'lg'} color={'telegram.200'}>{label}</Text>}
      </Button>

      {added > 0 && (
        <>
          <Text width={'40px'} textAlign={'center'} fontSize={'xl'} fontWeight={'600'}>
            {added}
          </Text>
          <IconButton borderRadius={'16px'}
                      bg={rgba(theme.colors.telegram[200], 0.2)}
                      backdropBlur={'8px'}
                      pl={buttonP} pr={buttonP}
                      height={buttonSize}
                      color="primary.200"
                      onClick={onRemove} aria-label={'basket'}>
            <Icon as={IoIosRemoveCircle} color={'telegram.200'} fontSize={iconSize}/>
          </IconButton>
        </>
      )}
    </Flex>
  );
};

export default BasketCounter;