import React, {useEffect} from 'react';
import {Box, Container, Flex, Heading, Text} from '@chakra-ui/react';
import ShopItem from '../components/Shops/ShopItem.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {webApp} from '../telegram.js';
import ShopsSkeleton from '../components/Shops/ShopsSkeleton.jsx';
import Market from '../components/Shops/Market.jsx';

const Shops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shops = useSelector(state => state.shops.data);

  const handleSelect = async (shop) => {
    await dispatch(setCurrentShop(shop));
    navigate(`/shop/${shop.id}`);
  };

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.hide();
    }
  }, [])

  console.log(shops);

  return (
    <Container p={'16px'}>
      {shops ? <Box p={'8px'}>
        <Heading fontSize={'lg'} fontWeight={'400'} mb={'16px'}>Выберите мастера</Heading>
        <Flex direction={'column'} gap={'24px'}>
          {shops.map(shop =>
            <ShopItem key={shop.id} onSelect={handleSelect} {...shop} />
          )}
        </Flex>
      </Box> : <ShopsSkeleton/>}
    </Container>
  )
};

export default Shops;