import React from 'react';
import {Flex, Heading, HStack, Text, VStack} from '@chakra-ui/react';
import {CheckCircleIcon, Icon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {IoPauseCircleSharp} from 'react-icons/io5';

function isTimeBetween10AMand8PM(utc530Time) {
  const localTime = new Date(utc530Time);
  const hours = localTime.getHours();
  return hours >= 10 && hours < 20;
}

const AppBar = () => {
  const {t, i18n: {language: lng}} = useTranslation();

  const isWorkingTime = isTimeBetween10AMand8PM(Date.now());

  return (
    <Flex justifyContent={'space-between'} p={'24px'}>
      <VStack spacing={0.5} alignItems={'flex-start'}>
        <HStack>
          <Text fontSize={'lg'}>😉</Text>
          <Text fontSize={'lg'}>🥐</Text>
          <Text fontSize={'lg'}>🌮</Text>
          <Text fontSize={'lg'}>🥯</Text>
        </HStack>
        <Heading as={Link} to={'/'} fontWeight={'700'} fontSize={'md'}>swami.market</Heading>
      </VStack>
      <VStack spacing={0.5} alignItems={'flex-end'}>
        <Flex gap={'8px'}>
          {isWorkingTime ? <CheckCircleIcon color={'telegram.200'} /> : <Icon color={'telegram.200'} as={IoPauseCircleSharp} />}
          <Heading fontSize={'md'}>{t(isWorkingTime ? 'info.status.active' : 'info.status.inactive')}</Heading>
        </Flex>
        <Text fontSize={'md'}>{isWorkingTime ? t('info.delivery', { minutes: 64 }) : t('info.rest')}</Text>
      </VStack>
    </Flex>
  );
};

export default AppBar;