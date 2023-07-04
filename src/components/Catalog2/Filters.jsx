import {useState, useCallback} from 'react';
import {Box, Drawer, DrawerOverlay, DrawerContent} from '@chakra-ui/react'
import FiltersButton from "./FiltersButton";
import {useNavigate} from 'react-router-dom';

const Text = ({children}) => {
  return <div>{children}</div>
}

const Filters = () => {
  const navigate = useNavigate();

  const handleFiltersOpen = useCallback(() => {
    navigate('/filters');
  }, []);

  return (
    <Box>
      <FiltersButton onFiltersClick={handleFiltersOpen} />

      <div class="filters-result-title">72 masters found</div>

    </Box>
  );
};

export default Filters;
