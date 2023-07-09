import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBook, clearDeletedBasket, setBookTime } from '../api/slices/bookingSlice.js';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import TimeSlotPicker from '../components/Booking/TimeSlotPicker.jsx';
import { MainButton } from '../components/MainButton.jsx';
import { BackButton } from '../components/BackButton.jsx';
import { MasterCard, ProductCard } from '../components/Payment/Cards';

const Booking = () => {
  const dispatch = useDispatch();
  const { bookTime } = useSelector(state => state.booking);
  const products = useSelector(state => state.booking.basket);
  const currentShop = useSelector(state => state.shops.current);
  const navigate = useNavigate();

  const handleTimeChange = (date) => {
    dispatch(setBookTime(date.toISOString()));
  }

  const handleCancelOrder = () => {
    dispatch(cancelBook());
    navigate(-1);
  }

  const handleConfirmOrder = async () => {
    navigate('/payment');
  };

  useEffect(() => {
    return () => {
      dispatch(clearDeletedBasket());
    };
  }, []);


  return (currentShop && products.length > 0) && (
    <Box>
      <Box p={'1rem'} pb='10rem'>
        <BackButton onClick={handleCancelOrder} />
        <Heading fontSize='5xl'>Make Appointment</Heading>

        <VStack mt='1rem' gap='8px' mb='2rem' alignItems={'stretch'}>
          <MasterCard shop={currentShop} />
          <ProductCard product={products[0]} />
        </VStack>

        <TimeSlotPicker onChange={handleTimeChange} shop={currentShop} product={products[0]} />

        <Box mt='32px'>
          <Button w={'100%'} borderColor={'telegram.200'} onClick={handleCancelOrder} color={'telegram.200'} variant="outline">Cancel Booking</Button>
        </Box>
      </Box>

      <MainButton onClick={handleConfirmOrder}>Continue</MainButton>
    </Box>
  )
};

export default Booking;