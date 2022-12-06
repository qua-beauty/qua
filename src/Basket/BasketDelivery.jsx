import React, {useContext, useState} from 'react';
import {Button, IconButton, styled, TextField, Typography} from '@mui/material';
import {ArrowBack, Close} from '@mui/icons-material';
import BasketContext from './BasketContext.jsx';
import {useForm, Controller} from 'react-hook-form';
import {MuiTelInput, matchIsValidTel} from 'mui-tel-input';
import {getCurrencyTitle} from '../utils.js';

const Base = styled('div')`
  padding: 40px 20px 80px;

  text-align: center;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

const Field = styled(TextField)`
`;

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const PhoneField = styled(MuiTelInput)`
  .MuiTelInput-Flag {

  }
`;

const BackButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const ButtonSubtitle = styled('span')`
  font-size: 14px;
  
`;
const ButtonTitle = styled('span')`
  margin-left: 32px;
  font-size: 16px;
  
  span {
    margin-left: 8px;
  }
`;

const BasketDelivery = () => {
  const {collapseBasket, makeOrder, setBasketStep, price, currency, timeForCook} = useContext(BasketContext);
  const {handleSubmit, control, formState: {isValid}} = useForm();
  const [loading, setLoading] = useState(false);

  const handleMakeOrder = async (data) => {
    if (!isValid) return;

    setLoading(true);
    await makeOrder(data);
    setLoading(false);
  };

  return (
    <Base>
      <CloseButton onClick={collapseBasket}>
        <Close/>
      </CloseButton>
      <BackButton onClick={() => setBasketStep('details')}>
        <ArrowBack/>
      </BackButton>
      <form onSubmit={handleSubmit(handleMakeOrder)}>
        <Title variant="h5">🛵 Куда доставляем?</Title>
        <Controller
          name="phone"
          control={control}
          rules={{validate: matchIsValidTel, required: true}}
          render={({field: {onChange, value}, fieldState}) => (
            <PhoneField
              label="Контактный телефон"
              id="outlined-size-small"
              size="small"
              margin="normal"
              variant="filled"
              fullWidth={true}
              helperText={fieldState.invalid ? 'Телефон неверный, введите другой' : 'Чтобы подтвердить ваш заказ'}
              type="tel"
              value={value}
              onChange={onChange}
              error={fieldState.invalid}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({field: {onChange, value}, fieldState}) => (
            <Field
              label="Отель, вилла или адрес"
              id="outlined-size-small"
              size="small"
              margin="normal"
              multiline
              rows={2}
              variant="filled"
              fullWidth={true}
              helperText={fieldState.invalid ? 'А доставить-то куда?' : 'Курьер доставит заказ на этот адрес'}
              value={value}
              onChange={onChange}
              error={fieldState.invalid}
            />
          )}
        />
        <SubmitButton variant="contained" type="submit" disabled={loading}>
          <ButtonSubtitle>Оформить заказ</ButtonSubtitle>
          <ButtonTitle>{price} {getCurrencyTitle(currency)}<span>{timeForCook ? ' 􀐱 ' + timeForCook: ''}</span></ButtonTitle>
        </SubmitButton>
      </form>
    </Base>
  );
};

export default BasketDelivery;