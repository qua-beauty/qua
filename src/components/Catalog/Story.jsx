import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Story = ({ name }) => {
  return (
    <Box textAlign='center'>
      <Box w='64px' h='64px' bg='background.default' border='1px solid' borderColor='brand.200' borderRadius='32px' />
      <Text mt='4px' fontSize='sm' fontWeight='500'>{name}</Text>
    </Box>
  );
};

export default Story;
