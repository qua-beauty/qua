import React, {useState, useContext, useEffect} from 'react';
import {Box, Button, styled, Typography} from '@mui/material';
import BasketContext from './BasketContext.jsx';
import ProductThumbs from '../Product/ProductThumbs.jsx';
import {useTimer} from '../components/Timer.jsx';

const collapsedCss = {
  padding: '16px',
  height: '72px',
  transition: 'width, height 0.225s ease'
}

const expandedCss = {
  padding: '28px 28px 28px',
  height: '360px',
  transition: 'width, height 0.225s ease'
}

const Base = styled(Box)`
  background: linear-gradient(136.18deg, #D5DEE7 -19.7%, #FFAFBD -19.7%, #C9FFBF 21.36%, #BFFFF3 101.63%);
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

const Action = styled(Typography)`
  display: block;
  font-weight: 500;

  color: ${({theme}) => theme.palette.primary.dark};
`;

const TimerBase = styled('div')`
  
`;

const Timer = ({ endTime }) => {
  const {minutes, seconds, invalidTime} = useTimer(endTime);
  
  return (
    <TimerBase>
      {invalidTime ? `Look's like already cooked!` : `${minutes}:${seconds}`}
    </TimerBase>
  )
}

const BasketOrder = () => {
  const [expanded, setExpanded] = useState(false);
  const {order} = useContext(BasketContext);

  if(!order) return <></>;

  return (
    <Base sx={expanded ? expandedCss : collapsedCss}>
      <Cooking onClick={() => setExpanded(true)}>
        <ProductThumbs products={order.products} size={expanded ? 'medium' : 'small'} />
        {order && order.endTime && <Timer endTime={order.endTime} />}
        <Action>Cooking...</Action>
      </Cooking>

      {expanded && <>
        <Typography>Crispy sandwich and your favorite soup will be ready soon</Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => setExpanded(false)}>Close</Button>
      </>}
    </Base>
  )
}

export default BasketOrder;