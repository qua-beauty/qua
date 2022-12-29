import React, {useContext, useEffect, useState} from 'react';
import {Chip, IconButton, styled, Typography} from '@mui/material';
import BasketContext from '../Basket/BasketContext.jsx';
import {getCurrencyTitle} from '../../utils.js';
import {Link} from 'react-router-dom';
import {Add, Remove} from '@mui/icons-material';

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
  min-height: 240px;
  
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

const ChipButton = styled(IconButton)`
  background: ${({ theme }) => theme.palette.background.paper};
`;

const Title = styled(Typography)`
  margin: 4px 0 8px;
  font-size: 13px;
  font-weight: 500;
`;


const ShopTitle = styled(Typography)`
  border: 1px solid #222;
  border-radius: 8px;
  
  margin-top: 8px;
  padding: 2px 6px;
  
  font-size: 13px;
  font-weight: 500;
`;

const Product = (product) => {
  const {title, photo, price, currency, time, shopTitle, shopColor, id} = product;
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
      <ShopTitle sx={{
        borderColor: shopColor ? shopColor : 'inherit'
      }}>{shopTitle}</ShopTitle>
      <Title>{title}</Title>

      {added === 0 && <Chip color="primary" onClick={handleClick} label={`${price} ${getCurrencyTitle(currency)}`}></Chip>}

      {added > 0 && <PlusMinus>
        <ChipButton color="primary" size="small" onClick={handleMinus}><Remove /></ChipButton>
        <span>{added}</span>
        <ChipButton color="primary" size="small" onClick={handlePlus}><Add /></ChipButton>
      </PlusMinus>}
    </Base>
  );
};

export default Product;