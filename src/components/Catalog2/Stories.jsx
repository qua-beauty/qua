import Story from "./Story";
import React from "react";
import { Flex, Box } from '@chakra-ui/react';

const Stories = () => {
  return (
    <Box maxW='100%' overflow={'auto'}>
      <Flex gap='1rem'>
        <Story name='life' />
        <Story name='new masters' />
        <Story name='discounts' />
        <Story name='reviews' />
        <Story name='blog' />
      </Flex>
    </Box>
  );
};

export default Stories;
