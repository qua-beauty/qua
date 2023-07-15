import React from "react";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { TuneIcon } from '../Icons'
import { useSelector } from "react-redux";
import { getCategoryIcon } from "../Filters/Icons";

const FiltersButton = ({ onFiltersClick }) => {
  const categories = useSelector(state => state.categories.data);
  const filters = useSelector(state => state.filters.filters);
  const activeCategory = filters?.category && categories?.find(category => category.id === filters.category);
  const title = activeCategory ? activeCategory.name + ' services' : 'All beauty services';

  return (
    <Button
      onClick={onFiltersClick}
      w='100%'
      size='lg'
      justifyContent={'space-between'}

    >
      <Flex alignItems={'center'} textAlign={'left'} fontSize='1xl'>
        {activeCategory && <Box ml='-8px' mr='8px' sx={{
          '& svg': {
            width: '48px',
            height: '48px',
          }
        }}>
          {getCategoryIcon(activeCategory.name)}
        </Box>}
        <Box>
          <Text>{title}</Text>
          <Flex mt='2px' fontSize='sm' gap='12px' alignItems='center' color='text.secondary'>
            <Text>Around 10km</Text>
            <Text>Any price</Text>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <TuneIcon fontSize='24px' />
      </Box>
    </Button>
  );
};

export default FiltersButton;
