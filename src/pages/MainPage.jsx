import { useDispatch, useSelector } from 'react-redux';
import { setCurrentShop } from '../api/slices/shopSlice.js';
import { Box, Flex, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MasterCard from '../components/Catalog2/MasterCard';
import { webApp } from '../telegram.js';
import Stories from "../components/Catalog2/Stories";
import Filters from "../components/Catalog2/Filters";
import ShopsSkeleton from "../components/MainPage/ShopsSkeleton.jsx";

function MainPage() {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.shops.data)
  const navigate = useNavigate();

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
    <Box pb='40px'>
      <Flex direction='column' p='1rem' gap='1.5rem'>
        <Stories />
        <Filters />
      </Flex>
      <Flex w={'100%'} p={'1rem'} gap={'24px'} direction={'column'}>
        {catalog?.map(master => {
          return <MasterCard onSelect={() => handleSelect(master)} key={master.id} {...master} />;
        })}
      </Flex>
      <Box textAlign={'center'}>
        <Button variant={'outline'} colorScheme='telegram'>
          Show more
        </Button>
      </Box>
    </Box>
  ) : <ShopsSkeleton />;
}

export default MainPage;
