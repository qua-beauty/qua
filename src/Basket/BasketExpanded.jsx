import React from 'react';
import {Button, styled, Typography} from '@mui/material';
import ProductInline from '../ProductInline.jsx';

const Base = styled('div')`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  
  background: linear-gradient(74.19deg, #FAD0C4 9.5%, #FAD0C4 10.09%, #F0D9FF 68.93%);
  backdrop-filter: blur(2px);
  border-radius: 24px 24px 0 0;
`;

const Title = styled(Typography)`

`;

const Products = styled('div')`
  display: flex;
  flex-direction: row;
`;

const BasketExpanded = () => {
  return (
    <Base>
      <Title>👨‍🍳 We are ready to cook!</Title>
      <Products>
        <ProductInline />
      </Products>
      <Button variant="contained" color="primary">Send for cooking</Button>
    </Base>
  )
};

export default BasketExpanded;