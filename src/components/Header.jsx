import React from 'react';
import {Flex, Heading, HStack, Text, VStack} from '@chakra-ui/react';
import {CheckCircleIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';

const AppBar = () => {
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
          <Heading fontSize={'md'}>работаем</Heading>
        </Flex>
        <Text fontSize={'md'}>доставка ≈  64 минуты</Text>
      </VStack>
    </Flex>
  );
};

export default AppBar;