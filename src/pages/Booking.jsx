import React, { useCallback, useEffect } from 'react';
import ProductInline from '../components/Booking/ProductInline.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBook, clearDeletedBasket, setBookTime } from '../api/slices/bookingSlice.js';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import TimeSlotPicker from '../components/Booking/TimeSlotPicker.jsx';
import ImmersiveCard from '../components/ImmersiveCard.jsx';
import {MainButton} from '../components/MainButton.jsx';
import {BackButton} from '../components/BackButton.jsx';

const Booking = () => {
  const dispatch = useDispatch();
  const { bookTime } = useSelector(state => state.booking);
  const allBasket = useSelector(state => state.booking.basket);


  const currentShop = useSelector(state => state.shops.current);
  const navigate = useNavigate();

  const handleTimeChange = (date) => {
    dispatch(setBookTime(date.toISOString()));
  }

  const handleCancelOrder = () => {
    dispatch(cancelBook());
    navigate(-1);
  }

  const handleConfirmOrder = useCallback(async () => {
    navigate('/payment');
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearDeletedBasket());
    };
  }, []);

  return currentShop && (
    <Box p={'16px'}>
      <BackButton onClick={handleCancelOrder} />

      <Flex direction={'column'} alignItems={'center'}>
        <Heading fontSize={'2x1'} fontWeight={'400'}>Make Booking</Heading>
      </Flex>

      <ImmersiveCard categoryName={currentShop.category.name} name={currentShop.name} />


      <Flex mt={'10px'} direction={'column'} alignItems={'stretch'}>
        {allBasket && allBasket.map(product => <ProductInline key={product.id} product={product} />)}
      </Flex>

      <TimeSlotPicker onChange={handleTimeChange} />

      <Box p={'12px'}>
        <Button w={'100%'} borderColor={'telegram.200'} onClick={handleCancelOrder} color={'telegram.200'} variant="outline">Cancel Booking</Button>
        <MainButton disabled={!bookTime} onClick={handleConfirmOrder}>Continue</MainButton>
      </Box>
    </Box>
  );
};

export default Booking;