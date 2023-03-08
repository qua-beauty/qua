import React from 'react';
import {Flex, Heading, HStack, Text, VStack} from '@chakra-ui/react';
import {CheckCircleIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const AppBar = () => {
  const {t, i18n: {language: lng}} = useTranslation();

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
          <CheckCircleIcon color={'telegram.200'} />
          <Heading fontSize={'md'}>{t('info.status.active')}</Heading>
        </Flex>
        <Text fontSize={'md'}>{t('info.delivery', { minutes: 64 })}</Text>
      </VStack>
    </Flex>
  );
};

export default AppBar;