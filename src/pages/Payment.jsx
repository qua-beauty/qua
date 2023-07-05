import React, { useCallback, useEffect } from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { Form } from '../components/Payment/Form';
import { MasterCard, ProductCard, DateTimeCard } from '../components/Payment/Cards';
import { clearBasket } from '../api/slices/bookingSlice.js';
import { fetchAnswerWebQuery } from '../api/services.js';
import { useSaveOrderMutation } from '../api/api.js';
import { BackButton } from '../components/BackButton';

const Payment = () => {
  const dispatch = useDispatch();
  const [saveOrder] = useSaveOrderMutation();
  const navigate = useNavigate();

  const user = useSelector(state => state.user.data);
  const currentShop = useSelector(state => state.shops.current);
  const { price, bookTime, currency, basket } = useSelector(state => state.booking);
  const products = basket.filter(product => !product.isDeleted);

  const handleBackClick = () => {
    navigate(-1);
  }

  const handleOrderSubmit = useCallback(async () => {
    try {
      const order = await saveOrder([{
        products,
        bookTime: bookTime,
        price,
        currency,
        user,
        master: currentShop,
        date: new Date(),
        commission: price * (parseInt(currentShop.commission) / 100),
        status: 'draft',
      }]).unwrap();

      await fetchAnswerWebQuery({ messageText: `order-${order.id}` });
      dispatch(clearBasket());

    } catch (e) {
      console.log(e);
    }
  }, [basket, currentShop, user, bookTime])

  return (
    <Box p={'1rem'} pb='10rem'>
      <BackButton onClick={handleBackClick} />
      <Heading fontSize='5xl'>Make Appointment</Heading>

      <VStack mt='1rem' gap='8px' alignItems={'stretch'}>
        <MasterCard />
        <ProductCard />
        <DateTimeCard />
      </VStack>

      <Form onSubmit={handleOrderSubmit} />
    </Box>
  );
};

export default Payment;