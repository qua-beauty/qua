import React, { useMemo } from "react";
import { Box, Tag, Flex, Text, Heading } from '@chakra-ui/react';

const Product = ({
  onSelect,
  name, time, price,
}) => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'flex-start'} onClick={onSelect}>
      <Box>
        <Heading fontSize='lg' color='text.primary' fontWeight={'500'}>{name}</Heading>
        <Text fontSize='md' color='text.secondary'>{time} min</Text>
      </Box>
      <Tag size='lg' variant='solid' colorScheme='brand' fontSize='md'>
        ${price}
      </Tag>
    </Flex>
  );
};

export default Product;
