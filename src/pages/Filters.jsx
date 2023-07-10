import { BackButton } from "../components/BackButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";
import { CategoryFilter } from '../components/Filters/CategoryFilter.jsx';
import { FilterActions } from '../components/Filters/FilterActions.jsx';
import { FilterCard } from "../components/Filters/FilterCard.jsx";
import { clearFilters, toggleFilter } from '../api/slices/filterSlice.js';
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const filters = useSelector(state => state.filters.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterChange = (filterName, payload) => {
    dispatch(toggleFilter([filterName, payload]));
  };

  const handleSaveFilters = () => {
    navigate('/');
  }

  const handleClearFilters = () => {
    dispatch(clearFilters());
    navigate('/');
  }

  return (
    <Box bg='background.filters' p='1.5rem 1rem 10rem' minH='100vh'>
      <BackButton onClick={handleSaveFilters} />
      <Flex direction={'column'} gap='0.5rem'>
        <CategoryFilter onChange={handleFilterChange} selectedCategory={filters?.category} />
        <FilterCard label='Date' value='Any' />
        <FilterCard label='Distance' value='Any' />
        <FilterCard label='Price' value='Any' />
        <FilterCard label='Age' value='Any' />
      </Flex>
      <FilterActions onSave={handleSaveFilters} onClear={handleClearFilters} />
    </Box>
  )
}

export default Filters;