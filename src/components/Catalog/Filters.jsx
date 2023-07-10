import { useCallback } from 'react';
import { Box, Text } from '@chakra-ui/react'
import FiltersButton from "./FiltersButton";
import { useNavigate } from 'react-router-dom';

const Filters = ({ itemsCount }) => {
  const navigate = useNavigate();

  const handleFiltersOpen = useCallback(() => {
    navigate('/filters');
  }, []);

  return (
    <Box>
      <FiltersButton onFiltersClick={handleFiltersOpen} />
      <Text mt='1rem' color='text.secondary' fontSize='sm' textAlign='center'>
        {itemsCount} masters found
      </Text>
    </Box>
  );
};

export default Filters;
