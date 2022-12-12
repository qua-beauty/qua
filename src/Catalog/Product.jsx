import React, {useContext, useEffect, useState} from 'react';
import {ButtonBase, Chip, styled, Typography} from '@mui/material';
import BasketContext from '../Basket/BasketContext.jsx';
import {getCurrencyTitle} from '../utils.js';

const Base = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;

  padding-top: 10px;

  align-items: center;
  overflow: hidden;
  margin: 5px;
  box-sizing: border-box;
  height: 208px;
  
  text-align: center;


  &.Mui-disabled {
    pointer-events: all;
  }
`;

const Image = styled('div')`
  height: 120px;
  display: flex;
  align-items: center;
  overflow: hidden;

  img {
    border-radius: 50%;
    margin-top: 0;
    width: 120px;
  }
`;

const PlusMinus = styled('div')`
  display: flex;
  align-items: center;

  > * {
  }

  > span {
    display: inline-block;
    min-width: 32px;
    text-align: center;
  }
`;

const ChipButton = styled(Chip)`
  background: #fff;
  width: 40px;
  height: 32px;

`;

const Title = styled(Typography)`
  margin: 8px 0;
  font-size: 13px;
  font-weight: 500;
`;


const Product = (product) => {
  const {title, photo, price, currency, time} = product;
  const [added, setAdded] = useState(0);
  const {addProduct, deleteProduct, basket} = useContext(BasketContext);

  const handleClick = () => {
    setAdded(added + 1);
    addProduct(product);
  };
  const handlePlus = () => {
    setAdded(added + 1);
    addProduct(product);
  };
  const handleMinus = () => {
    deleteProduct(product);
    setAdded(added - 1);
  };

  useEffect(() => {
    if (!basket) {
      setAdded(0);
    }
  }, [basket]);


  return (
    <Base component="div" sx={{
      background: added ? '#edd9ff' : 'inherit'
    }}>
      <Image>
        <img src={photo} alt=""/>
      </Image>
      <Title>{title}</Title>

      {added === 0 && <Chip color="secondary" onClick={handleClick} label={`${price} ${getCurrencyTitle(currency)}${time ? (' 􀐱' + time) : ''}`}></Chip>}

      {added > 0 && <PlusMinus>
        <ChipButton label="􀅽" onClick={handleMinus}></ChipButton>
        <span>{added}</span>
        <ChipButton label="􀅼" onClick={handlePlus}></ChipButton>
      </PlusMinus>}
    </Base>
  );
};

export default Product;