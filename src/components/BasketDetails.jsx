import React, {useCallback, useEffect} from 'react';
import {Button, InputBase, styled, Typography} from '@mui/material';
import ProductInline from './ProductInline.jsx';
import {getCurrencyTitle} from '../utils.js';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearBasket} from '../api/slices/basketSlice.js';
import {useSaveOrderMutation} from '../api/api.js';
import {webApp} from '../telegram.js';
import {fetchAnswerWebQuery} from '../api/services.js';

const Base = styled('div')`
  background: ${({theme}) => theme.palette.background.default};
  padding: 16px 16px 16px;
`;

const Header = styled('header')`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Typography)`
  display: inline-flex;
  align-items: center;
  border-radius: 16px;

  height: 32px;

  font-size: 0.825rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const BackButton = styled(Button)`
  height: 32px;
  padding: 0 12px;
  background: ${({theme}) => theme.palette.background.paper};

  font-size: 0.825rem;
  letter-spacing: 0;
  font-weight: 500;
`;

const Products = styled('div')`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
`;

const Comment = styled('div')`
  margin-top: 32px;
`;

const CommentField = styled(InputBase)`
  background: ${({theme}) => theme.palette.background.paper};
  border-radius: 12px;
  padding: 6px 16px;
`;

const BasketDetails = () => {
  const dispatch = useDispatch();
  const {basket, price, count, currency} = useSelector(state => state.basket);
  const currentShop = useSelector(state => state.shops.current);
  const user = useSelector(state => state.user.data);
  const navigate = useNavigate();
  const [saveOrder] = useSaveOrderMutation();

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
          name: product.name,
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
    webApp.MainButton.text = `Продолжить (${price} ${getCurrencyTitle(currency)})`;
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

  return (
    <Base>
      <Header>
        <Title color="textPrimary" variant="caption">Ваш заказ</Title>
        <BackButton component={Link} to={`/`} size="small">Изменить</BackButton>
      </Header>

      <Products>
        {basket && basket.map(product => <ProductInline key={product.id} {...product} />)}
      </Products>

      {import.meta.env.DEV && (
        <Button onClick={handleMakeOrder}>Make Order</Button>
      )}
    </Base>
  );
};

export default BasketDetails;