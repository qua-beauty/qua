import React, {useCallback, useEffect} from 'react';
import ProductInline from '../components/Basket/ProductInline.jsx';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearBasket, clearDeletedBasket} from '../api/slices/basketSlice.js';
import {useSaveOrderMutation} from '../api/api.js';
import {isDirectWebApp, webApp} from '../telegram.js';
import {fetchAnswerWebQuery} from '../api/services.js';
import {useTranslation} from 'react-i18next';
import {Box, Button, Flex, Heading, Text, useTheme} from '@chakra-ui/react';
import {borderRadius} from '../globalSx.js';
import ReactMarkdown from 'react-markdown';
import {rgba} from '../utils.js';
import {isWorkingTime} from '../helpers.js';

const Basket = () => {
  const dispatch = useDispatch();
  const {price, count, currency} = useSelector(state => state.basket);
  const allBasket = useSelector(state => state.basket.basket);
  const basket = useSelector(state => {
    const {basket} = state.basket;
    return basket.filter(product => !product.isDeleted);
  });

  const currentShop = useSelector(state => state.shops.current);
  const user = useSelector(state => state.user.data);
  const navigate = useNavigate();
  const [saveOrder] = useSaveOrderMutation();
  const {t, i18n: { language: lng }} = useTranslation();
  const theme = useTheme();

  const isWorking = isWorkingTime(currentShop?.startTime, currentShop?.endTime) && currentShop.available;

  const handleMakeOrder = useCallback(() => {
    if (webApp) {
      webApp.MainButton.disable();
      webApp.MainButton.showProgress();
      webApp.disableClosingConfirmation();
    }

    try {
      saveOrder([{
        products: basket,
        count,
        price,
        currency,
        user,
        shop: currentShop,
        date: new Date(),
        commission: price * (parseInt(currentShop.commission) / 100),
        productsJson: basket.map(product => ({
          name: product.name[lng],
          count: product.count,
          icon: product.icon,
          price: product.price,
          posterId: product.posterId,
          weight: product.weight
        })),
        status: 'draft',
      }]).unwrap().then(async (order) => {
        if (webApp) {
          if(isDirectWebApp) {
            webApp.openTelegramLink(`https://t.me/swamimarketbot?start=order-${order.id}`);
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
  }, [basket, currentShop, user])

  useEffect(() => {
    if (webApp) {

      if(basket.length === 0) {
        webApp.MainButton.text = t('basket.continueDisabledButton');
        webApp.MainButton.color = theme.colors.background.default;
        webApp.MainButton.disable();
      } else if(!isWorking) {
        webApp.MainButton.text = t('basket.continueNotWorking');
        webApp.MainButton.color = theme.colors.background.default;
        webApp.MainButton.disable();
      } else {
        webApp.MainButton.text = `${t('basket.continueNotWorking')} ${count > 0 && `(${count}x${price} ${t(
          `currency.${currency}`, {ns: 'common'})})`}`;
        webApp.MainButton.color = '#66bb6a';
        webApp.MainButton.enable();
      }

      if(isWorking) {
        webApp.MainButton.onClick(handleMakeOrder);
      }

      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate('/');
      });

      return () => {
        webApp.MainButton.offClick(handleMakeOrder);
      };
    }
  }, [basket, theme]);

  useEffect(() => {
    return () => {
      dispatch(clearDeletedBasket());
    };
  }, []);

  return currentShop && (
    <Box p={'16px'}>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading fontSize={'2x1'} fontWeight={'400'}>{t('basket.title')}</Heading>
      </Flex>

      <Flex mt={'10px'} direction={'column'} alignItems={'stretch'}>
        {allBasket && allBasket.map(product => <ProductInline key={product.id} product={product}/>)}
      </Flex>

      {currentShop?.delivery && <Box mt={'16px'} bg={'background.default'} p={'8px'} sx={{ ...borderRadius(12, 12) }}>
        <Text color={'text.secondary'}>{t('basket.deliveryTitle')}</Text>
        <Text fontSize={'md'} sx={{
          '& p > strong': {
            display: 'block',
            marginBottom: '2px',
            marginTop: '12px'
          }
        }}><ReactMarkdown>{currentShop?.delivery[lng]}</ReactMarkdown></Text>
      </Box>}

      {import.meta.env.DEV && (
        <Button isDisabled={basket.length === 0} onClick={handleMakeOrder}>{t('basket.continueButton')} {count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}</Button>
      )}
    </Box>
  );
};

export default Basket;