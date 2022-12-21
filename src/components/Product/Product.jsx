import React, {useContext, useEffect, useState} from 'react';
import {Chip, styled, Typography} from '@mui/material';
import BasketContext from '../Basket/BasketContext.jsx';
import {getCurrencyTitle} from '../../utils.js';
import {Link} from 'react-router-dom';

const Base = styled('div')`
  background: ${({ theme }) => theme.palette.background.paper};
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

const Image = styled(Link)`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;

  img {
    margin-top: 0;
    width: 120px;
  }
`;

const PlusMinus = styled('div')`
  display: flex;
  align-items: center;

  > span {
    display: inline-block;
    min-width: 32px;
    text-align: center;
  }
`;

const ChipButton = styled(Chip)`
  background: ${({ theme }) => theme.palette.background.paper};
  width: 40px;
  height: 32px;
`;

const Title = styled(Typography)`
  margin: 8px 0;
  font-size: 13px;
  font-weight: 500;
`;

const Product = (product) => {
  const {title, photo, price, currency, time, id} = product;
  const {addProduct, deleteProduct, basket} = useContext(BasketContext);
  const [added, setAdded] = useState(0);

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
    } else if(basket.products && basket.products.length > 0) {
      const product = basket.products.find(p => p.id === id);
      const count = product ? product.count : 0;

      setAdded(count);
    }
  }, [basket]);

  return (
    <Base component="div" sx={{
      background: added ? 'rgba(207,158,255,0.2)' : 'inherit'
    }}>
      <Image to={`/product/${id}`}>
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