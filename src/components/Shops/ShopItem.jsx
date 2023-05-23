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
        <Flex direction={"column"} sx={{
          width: '100%',
          height: 200,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          justifyContent: 'center',
          gap: '8px',
        }}>
          {logo && <Box width={'120px'} height={'120px'} borderRadius={'50%'} overflow={'hidden'}>
            <img src={logo} width={'100%'} alt=""/>
          </Box>}
          <Heading fontSize={'xl'}>{name}</Heading>
        </Flex>
      </Flex>
  );
};

export default ShopItem;