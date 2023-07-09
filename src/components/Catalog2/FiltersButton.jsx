import React from "react";
import { useCallback } from "react";
import './Filters.css';
import { Button, Text, Flex, Box } from "@chakra-ui/react";

const FiltersButton = ({ onFiltersClick }) => {
  
  return (
    <Button
      onClick={onFiltersClick}
      colorScheme="brand"
      w='100%'
      h='56px'
      justifyContent={'space-between'}
      p='8px 18px'
      borderRadius='16px'
      fontWeight='500'
    >
      <Text fontSize='3xl' fontWeight={'400'} textTransform={'uppercase'} color='text.onPrimarySecondary'>Qua</Text>
      <Box>
        <Text fontSize='xl' color='text.onPrimary'>All beauty services</Text>
        <Flex mt='2px' fontSize='9px' gap='8px' alignItems='center' color='text.onPrimarySecondary'>
          <Text fontSize='sm'>Around 10km</Text>
          ○
          <Text fontSize='sm'>Any price</Text>
        </Flex>
      </Box>
      <Box>
        <img alt="" src="/tune-fill0-wght400-grad0-opsz48-1.svg" />
      </Box>
    </Button>
  );
};

export default FiltersButton;
