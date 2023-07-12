import { useDispatch, useSelector } from 'react-redux';
import { selectShopsByFilters, setCurrentShop } from '../api/slices/shopSlice.js';
import { Box, Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MasterCard from '../components/Catalog/MasterCard.jsx';
import { webApp } from '../telegram.js';
import FiltersButton from "../components/Catalog/FiltersButton.jsx";
import ShopsSkeleton from "../components/MainPage/ShopsSkeleton.jsx";

function MainPage() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters.filters);
  const catalog = useSelector(selectShopsByFilters(filters));
  const navigate = useNavigate();

  const handleFiltersOpen = useCallback(() => {
    navigate('/filters');
  }, []);

  const handleMapsOpen = useCallback(() => {
    navigate('/maps');
  }, []);

  const handleSelect = (master) => {
    dispatch(setCurrentShop(master));
    navigate(`/shop/${master.id}`);
  }

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.hide();
      webApp.MainButton.hide();
    }
  }, []);

  return catalog ? (
    <Box pb='10rem'>
      <Flex direction='row' p='1rem' gap={2}>
        <FiltersButton onFiltersClick={handleFiltersOpen} />
        <Button size='lg' variant='outline' onClick={handleMapsOpen}>
          Maps
        </Button>
      </Flex>
      <Flex w={'100%'} p={'1rem'} gap={'24px'} direction={'column'}>
        {catalog?.map(master => {
          return <MasterCard onSelect={() => handleSelect(master)} key={master.id} {...master} />;
        })}
      </Flex>
      {false && <Box textAlign={'center'}>
        <Button variant={'outline'} colorScheme='brand'>
          Show more
        </Button>
      </Box>}
    </Box>
  ) : <ShopsSkeleton />;
}

export default MainPage;
