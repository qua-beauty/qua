import React, {useState} from 'react';
import PicOne from './assets/pic1.png';
import {ButtonBase, Chip, styled, Typography} from '@mui/material';

const Base = styled(ButtonBase)`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  
  max-width: 50%;
  width: 190px;
  height: 240px;
  
  
  img {
    border-radius: 50%;
    margin-top: 0;
    
    max-width: 120px;
    max-height: 120px;
  }
  
  &.Mui-disabled {
    pointer-events: all;
  }
`;

const PlusMinus = styled('div')`
  display: flex;
  align-items: center;
  > * {
    margin: 0 8px;
  }
`;

const ChipButton = styled(Chip)`
  background: #fff;
  width: 40px;
  height: 32px;
`;

const Title = styled(Typography)`
  margin: 12px 0;
`;


const Product = ({ title, photo, price, currency, time }) => {
  const [added, setAdded] = useState(0);

  const handleClick = () => {
    setAdded(added + 1);
  };
  const handlePlus = () => {
    setAdded(added + 1);
  };
  const handleMinus = () => {
    console.log(added);
    setAdded(added - 1);
  };


  return (
    <Base component="div" onClick={added === 0 ? handleClick : () => {}} sx={{
      background: added ? '#F0D9FF' : 'inherit'
    }}>
      <img src={photo} alt=""/>
      <Title>{title}</Title>
      {added === 0 && <Chip color="secondary" label={`${price} ${currency}  􀐱${time}`}></Chip>}
      {added > 0 && <PlusMinus>
        <ChipButton label="􀅽" onClick={handleMinus}></ChipButton>
        {added}
        <ChipButton label="􀅼" onClick={handlePlus}></ChipButton>
      </PlusMinus>}
    </Base>
  )
}

export default Product;