import React, {useContext, useEffect, useState} from 'react';
import {Button, InputBase, styled, Typography} from '@mui/material';
import ProductInline from '../Product/ProductInline.jsx';
import BasketContext from './BasketContext.jsx';
import {getCurrencyTitle} from '../../utils.js';
import {webApp} from '../../telegramUtils.js';
import {Link, useNavigate} from 'react-router-dom';

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
  const [comment, setComment] = useState('');
  const {basket, price, currency, makeOrder} = useContext(BasketContext);
  const navigate = useNavigate();

  const handleMakeOrder = () => {
    webApp.MainButton.disable();
    webApp.MainButton.showProgress();

    makeOrder({comment}).then(() => {
      webApp.disableClosingConfirmation();
      webApp.MainButton.hideProgress();
      webApp.close();
    })
  };

  if (webApp) {
    webApp.MainButton.text = `Оформить заказ 🎛 ${price} ${getCurrencyTitle(currency)}`;
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
        <BackButton component={Link} to="/" size="small">Изменить</BackButton>
      </Header>

      <Products>
        {basket && basket.products.map(product => <ProductInline key={product.id} {...product} />)}
      </Products>

      <Comment>
        <CommentField fullWidth={true}
                      multiline={true}
                      rows={2}
                      value={comment}
                      onChange={event => setComment(event.target.value)}
                      placeholder="Комментарий к заказу"/>
      </Comment>
    </Base>
  );
};

export default BasketDetails;