import React, {useContext, useState} from 'react';
import {Button, IconButton, styled, Typography} from '@mui/material';
import {Close} from '@mui/icons-material';
import BasketContext from './BasketContext.jsx';

const Base = styled('div')`
  padding: 40px 20px 80px;

  text-align: center;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;
const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const BasketSuccess = () => {
  const {collapseBasket} = useContext(BasketContext);

  return (
    <Base>
      <CloseButton onClick={collapseBasket}>
        <Close/>
      </CloseButton>
      <Title variant="h5">✅ Order is created</Title>
      <SubmitButton variant="contained" type="submit" component={'a'} href="">Make Order</SubmitButton>
    </Base>
  );
};

export default BasketSuccess;