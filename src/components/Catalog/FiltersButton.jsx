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
      w='100%'
      size='lg'
      justifyContent={'space-between'}
      
    >
      <Box textAlign={'left'} fontSize='1xl'>
        <Text>{activeCategory}</Text>
        <Flex mt='2px' fontSize='sm' gap='12px' alignItems='center' color='text.secondary'>
          <Text>Around 10km</Text>
          <Text>Any price</Text>
        </Flex>
      </Box>
      <Box>
        <TuneIcon fontSize='24px' />
      </Box>
    </Button>
  );
};

export default FiltersButton;
