import React, {useState, useContext} from 'react';
import {Box, Button, css, styled, Typography} from '@mui/material';
import BasketContext from './BasketContext.jsx';
import ProductThumbs from '../ProductThumbs.jsx';

const collapsedCss = {
  padding: '16px 16px 80px',
  height: '120px',
  transition: 'width, height 0.225s ease'
}
const expandedCss = {
  padding: '28px 28px 80px',
  height: '360px',
  transition: 'width, height 0.225s ease'
}

const Base = styled(Box)`
  position: relative;
  text-align: center;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const BasketOrder = () => {
  const [expanded, setExpanded] = useState(false);
  const {order} = useContext(BasketContext);

  if(!order) return <></>;

  return (
    <Base sx={expanded ? expandedCss : collapsedCss}>
      <Cooking onClick={() => setExpanded(true)}>
        <ProductThumbs products={order.products} size={expanded ? 'medium' : 'small'} />
        <Timer>14:37</Timer>
        <Label>Cooking...</Label>
      </Cooking>

      {expanded && <>
        <Typography>Crispy sandwich and your favorite soup will be ready soon</Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => setExpanded(false)}>Close</Button>
      </>}
    </Base>
  )
}

export default BasketOrder;