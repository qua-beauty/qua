import React, {useContext, useEffect, useState} from 'react';
import {ButtonBase, Chip, styled, Typography} from '@mui/material';
import BasketContext from './Basket/BasketContext.jsx';
import {getCurrencyTitle} from './utils.js';

const Base = styled(ButtonBase)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;

  overflow: hidden;
  margin: 10px;
  min-width: 164px;
  max-width: 200px;
  height: 240px;


  &.Mui-disabled {
    pointer-events: all;
  }
`;

const Image = styled('div')`
  height: 140px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 16px;

  img {

    margin-top: 0;

    width: 100%;
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
  margin: 12px 0;
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
    <Base component="div" onClick={added === 0 ? handleClick : () => {
    }} sx={{
      background: added ? '#edd9ff' : 'inherit'
    }}>
      <Image>
        <img src={photo} alt=""/>
      </Image>
      <Title>{title}</Title>

      {added === 0 && <Chip color="secondary" label={`${price} ${getCurrencyTitle(currency)}${time ? (' 􀐱' + time) : ''}`}></Chip>}

      {added > 0 && <PlusMinus>
        <ChipButton label="􀅽" onClick={handleMinus}></ChipButton>
        <span>{added}</span>
        <ChipButton label="􀅼" onClick={handlePlus}></ChipButton>
      </PlusMinus>}
    </Base>
  );
};

export default Product;