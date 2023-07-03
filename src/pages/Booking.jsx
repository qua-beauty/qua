import React, {useCallback, useEffect} from 'react';
import ProductInline from '../components/Booking/ProductInline.jsx';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {cancelBook, clearBasket, clearDeletedBasket, setBookTime} from '../api/slices/bookingSlice.js';
import {useSaveOrderMutation} from '../api/api.js';
import {isDirectWebApp, webApp} from '../telegram.js';
import {fetchAnswerWebQuery} from '../api/services.js';
import {Box, Button, Flex, Heading} from '@chakra-ui/react';
import TimeSlotPicker from '../components/Booking/TimeSlotPicker.jsx';

const Booking = () => {
  const dispatch = useDispatch();
  const {price, bookTime, currency} = useSelector(state => state.booking);
  const allBasket = useSelector(state => state.booking.basket);

  const basket = useSelector(state => {
    const {basket} = state.booking;
    return basket.filter(product => !product.isDeleted);
  });

  const currentShop = useSelector(state => state.shops.current);
  const user = useSelector(state => state.user.data);
  const navigate = useNavigate();
  const [saveOrder] = useSaveOrderMutation();

  const handleTimeChange = (date) => {
    dispatch(setBookTime(date.toISOString()));
  }

  const handleCancelBook = useCallback(() => {
    dispatch(cancelBook());
    navigate('/');
  }, [])

  const handleMakeOrder = useCallback(() => {
    if (webApp) {
      webApp.MainButton.disable();
      webApp.MainButton.showProgress();
      webApp.disableClosingConfirmation();
    }

    try {
      saveOrder([{
        products: basket,
        bookTime: bookTime,
        price,
        currency,
        user,
        master: currentShop,
        date: new Date(),
        commission: price * (parseInt(currentShop.commission) / 100),
        status: 'draft',
      }]).unwrap().then(async (order) => {
        if (webApp) {
          if(isDirectWebApp) {
            webApp.openTelegramLink(`https://t.me/quadevbot?start=order-${order.id}`);
          } else {
            await fetchAnswerWebQuery({messageText: `order-${order.id}`});
            dispatch(clearBasket());
          }

          webApp.MainButton.hideProgress();
          webApp.close();

        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [basket, currentShop, user, bookTime])

  useEffect(() => {
    if (webApp) {
      webApp.MainButton.text = `Book and continue`;
      webApp.MainButton.color = '#66bb6a';
      webApp.MainButton.show();
      webApp.MainButton.enable();
      webApp.MainButton.onClick(handleMakeOrder);

      if(bookTime) {
        webApp.MainButton.show();
      } else {
        webApp.MainButton.hide();
      }

      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate('/');
      });

      return () => {
        webApp.MainButton.offClick(handleMakeOrder);
      };
    }
  }, [basket, bookTime]);

  useEffect(() => {
    return () => {
      dispatch(clearDeletedBasket());
    };
  }, []);

  console.log(allBasket)

  return currentShop && (
    <Box p={'16px'}>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading fontSize={'2x1'} fontWeight={'400'}>Make Booking</Heading>
      </Flex>

      <Flex mt={'10px'} direction={'column'} alignItems={'stretch'}>
        {allBasket && allBasket.map(product => <ProductInline key={product.id} product={product}/>)}
      </Flex>

      <TimeSlotPicker onChange={handleTimeChange} />

      <Box p={'12px'}>
        <Button w={'100%'} borderColor={'telegram.200'} onClick={handleCancelBook} color={'telegram.200'} variant="outline">Cancel Booking</Button>
      </Box>
    </Box>
  );
};

export default Booking;