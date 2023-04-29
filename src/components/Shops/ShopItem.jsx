import React from 'react';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {borderRadius} from '../../globalSx.js';
import {Offline, Online} from '../Status.jsx';
import {isWorkingTime} from '../../helpers.js';
import {useTranslation} from 'react-i18next';

const ShopItem = ({onSelect, ...shop}) => {
  const {name, logo, thumbnail, startTime, endTime, workTime, available} = shop;
  const isWorking = isWorkingTime(startTime, endTime) && available;
  const {t} = useTranslation();

  return (
      <Flex sx={{
        flexDirection: 'column',
      }} onClick={() => onSelect(shop)}>
        <Box sx={{
          background: `var(--chakra-colors-background-default) url(${thumbnail}) no-repeat center`,
          filter: isWorking ? 'none' : 'grayscale(1)',
          backgroundSize: 'cover',
          ...borderRadius(16),
          width: '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {logo && <Box width={'48px'} height={'48px'} borderRadius={'50%'} position={'absolute'} bottom={'8px'} left={'8px'} overflow={'hidden'}>
            <img src={logo} width={'100%'} alt=""/>
          </Box>}
        </Box>
        <Flex p={'0 8px'} mt={'8px'} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'xl'}>{name}</Heading>
          <Flex alignItems={'center'} gap={'6px'}>
            <Text fontWeight={'500'} fontSize={'md'}>
              {isWorking ? <>
                <Online/> {t('info.status.active')}
              </> : <>
                <Offline/> {available ? t('info.status.inactive') : ''}
              </>}
              {isWorking ? shop.workTime : (available ? shop.startTime : t('info.status.closed'))}
            </Text>
          </Flex>
        </Flex>
      </Flex>
  );
};

export default ShopItem;