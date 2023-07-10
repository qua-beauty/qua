import React from "react";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { TuneIcon } from '../Icons'
import { useSelector } from "react-redux";

const FiltersButton = ({ onFiltersClick }) => {
  const categories = useSelector(state => state.categories.data);
  const filters = useSelector(state => state.filters.filters);

  const activeCategory = (filters?.category && categories?.find(category => category.id === filters.category)?.name + ' services') || 'All beauty services';

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
      boxShadow='0px 6px 12px 0px rgba(137, 81, 255, 0.50), 0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
    >
      <Text fontSize='3xl' fontWeight={'400'} textTransform={'uppercase'} color='text.onPrimarySecondary'>Qua</Text>
      <Box>
        <Text fontSize='xl' color='text.onPrimary'>{activeCategory}</Text>
        <Flex mt='2px' fontSize='9px' gap='8px' alignItems='center' color='text.onPrimarySecondary'>
          <Text fontSize='sm'>Around 10km</Text>
          ○
          <Text fontSize='sm'>Any price</Text>
        </Flex>
      </Box>
      <Box>
        <TuneIcon fontSize='20px' color='text.onPrimarySecondary' />
      </Box>
    </Button>
  );
};

export default FiltersButton;
