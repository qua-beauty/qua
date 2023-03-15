import React, {useCallback, useEffect} from 'react';
import ProductInline from '../components/Basket/ProductInline.jsx';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearBasket} from '../api/slices/basketSlice.js';
import {useSaveOrderMutation} from '../api/api.js';
import {webApp} from '../telegram.js';
import {fetchAnswerWebQuery} from '../api/services.js';
import {useTranslation} from 'react-i18next';
import {Box, Button, Text, Flex, Heading} from '@chakra-ui/react';
import {borderRadius} from '../globalSx.js';
import ReactMarkdown from "react-markdown";

const Basket = () => {
  const dispatch = useDispatch();
  const {basket, price, count, currency} = useSelector(state => state.basket);
  const currentShop = useSelector(state => state.shops.current);
  const user = useSelector(state => state.user.data);
  const navigate = useNavigate();
  const [saveOrder] = useSaveOrderMutation();
  const {t, i18n: { language: lng }} = useTranslation();

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
        deliveryPrice: currentShop.deliveryPrice,
        date: new Date(),
        productsJson: JSON.stringify(basket.map(product => ({
          name: product.name[lng],
          count: product.count,
          icon: product.icon,
          price: product.price
        }))),
        status: 'draft',
      }]).unwrap().then(async (order) => {
        await fetchAnswerWebQuery({messageText: `order-${order.id}`});
        dispatch(clearBasket());

        if (webApp) {
          webApp.MainButton.hideProgress();
          webApp.close();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [basket, currentShop])

  if (webApp) {
    webApp.MainButton.text = `${t('basket.continueButton')} ${count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}`;
    webApp.MainButton.color = '#66bb6a';
    webApp.MainButton.enable();
    webApp.MainButton.onClick(handleMakeOrder);
    webApp.BackButton.show();
    webApp.BackButton.onClick(() => {
      navigate('/');
    });
  }

  useEffect(() => {
    return () => {
      if (webApp) {
        webApp.MainButton.offClick(handleMakeOrder);
      }
    };
  }, []);

  return currentShop && (
    <Box pt={'24px'}>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading fontSize={'xl'} fontWeight={'400'}><Text as={'span'} mr={'8px'}>🧺</Text> {t('basket.title')}</Heading>
      </Flex>

      <Flex mt={'10px'} direction={'column'} alignItems={'stretch'}>
        {basket && basket.map(product => <ProductInline key={product.id} {...product} />)}
      </Flex>

      {currentShop?.delivery && <Box mt={'16px'} bg={'background.default'} p={'10px'} sx={{ ...borderRadius(12, 12) }}>
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
        <Button onClick={handleMakeOrder}>{t('basket.continueButton')} {count > 0 && `(${count}x${price} ${t(`currency.${currency}`, { ns: 'common' })})`}</Button>
      )}
    </Box>
  );
};

export default Basket;