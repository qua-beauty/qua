import React, {useContext} from 'react';
import {Button, IconButton, styled, Typography} from '@mui/material';
import {CatalogContext} from '../Catalog/index.js';
import {BasketContext} from './index.js';
import {Close} from '@mui/icons-material';

const Base = styled('div')`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  margin: 0 auto;
  max-width: 480px;

  background: linear-gradient(74.19deg, #FAD0C4 9.5%, #FAD0C4 10.09%, #F0D9FF 68.93%);
  backdrop-filter: blur(2px);
  border-radius: 24px 24px 0 0;

  padding: 40px 20px 80px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

const Slogan = styled(Typography)`
  margin: 40px 0 32px;
`;

const Products = styled('div')`
  display: flex;
  
  img {
    width: 56px;
    border-radius: 50%;
    
    & + img {
      margin-left: -24px;  
    }
  }
  
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Cooking = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Timer = styled('div')`
  
`;

const Label = styled('div')`
  font-size: 20px;
`;



const BasketCooking = () => {
  const {getProductById} = useContext(CatalogContext);
  const {products, price, setStep} = useContext(BasketContext);

  return (
    <Base>
      <CloseButton onClick={() => setStep('INFO')}>
        <Close />
      </CloseButton>
      <Cooking>
        <Products>
          {products && products.map(product => <img key={product.id} src={getProductById(product.id).photo} alt=""/>)}
        </Products>
        <Timer>14:37</Timer>
        <Label>Cooking...</Label>
      </Cooking>
      <Slogan>Crispy sandwich and your favorite soup will be ready soon</Slogan>
      <Button variant="contained" color="secondary" size="large" onClick={() => setStep('INFO')}>Close</Button>
    </Base>
  );
};

export default BasketCooking;