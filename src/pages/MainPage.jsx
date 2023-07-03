import {useDispatch, useSelector} from 'react-redux';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {Box, Container, Flex, Button, useTheme} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import MasterCard from '../components/Catalog2/MasterCard';
import {webApp} from '../telegram.js';
import CatalogSkeleton from '../components/Catalog/CatalogSkeleton.jsx';
import Stories from "../components/Catalog2/Stories";
import Filters from "../components/Catalog2/Filters";

function MainPage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);
  const catalog = useSelector((state) => state.shops.data)
  const navigate = useNavigate();
  const theme = useTheme();

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

  const gradient = {
    dark: 'linear-gradient(180deg, #1D2122 0%, #1E1A21 59.37%, #222119 100%)',
    light: 'linear-gradient(180deg, #ECF9FF 0%, #F8F2FF59.37%, #FFFBD3 100%)'
  }

  return catalog ? (
    <Box pb='40px'>
      <Flex direction='column' p='1rem' gap='1.5rem'>
      <Stories />
        <Filters />
      </Flex>
      <Flex w={'100%'} p={'1rem'} gap={'24px'} direction={'column'}  color={text.primary}>
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
  ) : <CatalogSkeleton />;
}

export default MainPage;
