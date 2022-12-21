import React from 'react';
import {Button, Link, styled, Typography} from '@mui/material';

const Base = styled('footer')`
  padding: 0 20px 20px;
  margin-top: auto;
`;
const Copyright = styled(Typography)`
  font-size: 13px;
`;
const Left = styled('div')`
  
`;

const PartnerButton = styled(Button)`
  margin-left: -6px;
  margin-bottom: 8px;
  
  color: black;
`;

const Footer = () => {
  return (
    <Base>
      <Left>
        <PartnerButton size="small" href="https://rashdeva.t.me" target="_blank">🤝 Подключить ресторан</PartnerButton>
        <Copyright>Lanka.cafe © Доставка в Мириссе и Велигаме <br/> 2022-2023 🥦 Заполняем ваши животики</Copyright>
      </Left>
    </Base>
  )
}

export default Footer;