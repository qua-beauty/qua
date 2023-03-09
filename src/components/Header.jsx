import React from 'react';
import {Box, Flex, Heading, HStack, Text, useTheme, VStack} from '@chakra-ui/react';
import {CheckCircleIcon, Icon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {IoPauseCircleSharp} from 'react-icons/io5';
import {rgba} from '../utils.js';

function isTimeBetween10AMand8PM(utc530Time) {
  const localTime = new Date(utc530Time);
  const hours = localTime.getHours();
  return hours >= 10 && hours < 20;
}

const AppBar = () => {
  const {t, i18n: {language: lng}} = useTranslation();
  const theme = useTheme();

  const isWorkingTime = isTimeBetween10AMand8PM(Date.now());

  return (
    <Box zIndex={'100'} p={'16px'} mb={15}>
      <Flex backdropFilter={'blur(5px)'} borderRadius={'12px'} background={'telegram.300'} p={'4px 16px'}>
        <Flex flex={'1'} gap={'8px'} justifyContent={'space-between'} alignItems={'center'}>
          <Flex alignItems={'center'} gap={'8px'}>
            {isWorkingTime ? <CheckCircleIcon color={'telegram.200'} /> : <Icon color={'text.primary'} as={IoPauseCircleSharp} />}
            <Heading fontWeight={'400'} fontSize={'md'}>{t(isWorkingTime ? 'info.status.active' : 'info.status.inactive')}</Heading>
          </Flex>
          <Text fontWeight={'500'} textAlign={'right'} fontSize={'sm'}>{isWorkingTime ? t('info.delivery', { minutes: 64 }) : t('info.rest')}</Text>
        </Flex>
      </Flex>

    </Box>
  );
};

export default AppBar;