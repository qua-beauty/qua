import React, {useEffect, useState} from 'react';
import {Chip, IconButton, styled, Typography} from '@mui/material';
import {Add, Remove} from '@mui/icons-material';
import {addProduct, deleteProduct} from '../api/slices/basketSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

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

const Image = styled('div')`
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;

  position: relative;
  z-index: 1;

  img {
    margin-top: 0;
    width: 120px;
  }
`;

const NoImage = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  
  opacity: 0.6;
  filter: grayscale(100%) ;
  font-size: 48px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  z-index: -1;
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

const Product = ({ onSelect, ...product }) => {
  const dispatch = useDispatch();
  const {name, image, price, id, icon} = product;
  const {basket} = useSelector(state => state.basket);
  const [added, setAdded] = useState(0);
  const {t, i18n: { language: lng }} = useTranslation();

  const handleClick = () => {
    setAdded(added + 1);
    dispatch(addProduct(product));
  };
  const handlePlus = () => {
    setAdded(added + 1);
    dispatch(addProduct(product));
  };
  const handleMinus = () => {
    dispatch(deleteProduct(product));
    setAdded(added - 1);
  };

  useEffect(() => {
    if (!basket) {
      setAdded(0);
    } else if(basket.length > 0) {
      const product = basket.find(p => p.id === id);
      const count = product ? product.count : 0;

      setAdded(count);
    }
  }, [basket]);

  return (
    <Base component="div" sx={{
      background: added ? 'rgba(207,158,255,0.2)' : 'inherit'
    }}>
      <Image onClick={() => onSelect(product)}>
        {image && <img src={image} alt=""/>}
        <NoImage>{icon}</NoImage>
      </Image>
      <Title>{name[lng]}</Title>

      {added === 0 && <Chip color="primary" onClick={handleClick} label={`${price} ${t(`currency.LKR`, { ns: 'common' })}`}></Chip>}

      {added > 0 && <PlusMinus>
        <ChipButton color="primary" size="small" onClick={handleMinus}><Remove /></ChipButton>
        <span>{added}</span>
        <ChipButton color="primary" size="small" onClick={handlePlus}><Add /></ChipButton>
      </PlusMinus>}
    </Base>
  );
};

export default Product;