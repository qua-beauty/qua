import React, {useContext} from 'react';
import {Box, styled, Typography} from '@mui/material';
import {useActionData, useNavigate, useParams} from 'react-router-dom';
import CatalogContext from '../Catalog/CatalogContext.jsx';
import {webApp} from '../telegramUtils.js';


const Base = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  overflow: hidden;

  &.Mui-disabled {
    pointer-events: all;
  }
`;

const Image = styled(Box)`
  padding: 20px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  overflow: hidden;

  position: relative;
`;

const Photo = styled('img')`
  position: relative;
  z-index: 1;
`;

const Backdrop = styled('img')`
  position: absolute;
  top: -50%;
  margin-top: 25%;
  left: 0;
  width: 100%;
  filter: blur(40px)
`;

const Title = styled(Typography)`
  padding: 24px 0 0;
  font-size: 1.25rem;
  font-weight: 500;
  
  text-align: center;
`;

const Description = styled(Typography)`
  padding: 16px 32px;
  
  text-align: left;
`;

const ProductDetails = () => {
  const {getProduct} = useContext(CatalogContext);
  const {productId} = useParams();
  const product = getProduct(productId);
  const navigate = useNavigate();

  if(webApp) {
    webApp.BackButton.show();
    webApp.BackButton.onClick(() => {
      navigate(-1);
    })
  }

  const {title, photo, description, price, currency, time} = product || {};

  return (
    <Base component="div">
      <Image>
        <Photo src={photo} alt=""/>
        <Backdrop src={photo} alt=""/>
      </Image>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Base>
  );
};

export default ProductDetails;