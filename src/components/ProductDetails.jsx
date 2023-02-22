import React, {useEffect, useState} from 'react';
import {Box, Chip, IconButton, styled, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {webApp} from '../telegram.js';
import {getCurrencyTitle} from '../utils.js';
import {Add, Remove} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, deleteProduct} from '../api/slices/basketSlice.js';

const Base = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  overflow: hidden;

  &.Mui-disabled {
    pointer-events: all;
  }
`;

const Image = styled(Box)`
  background: ${({ theme }) => theme.palette.background.default};
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  position: relative;
`;

const Photo = styled('img')`
  position: relative;
  z-index: 1;
  height: auto;
  max-width: 100%;
`;

const NoImage = styled('div')`
  opacity: 0.85;
  filter: grayscale(100%);
  font-size: 100px;
`;

const Content = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  text-align: center;
`;

const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Description = styled(Box)`
  width: 100%;
  border-radius: 16px;
  background: ${({theme}) => theme.palette.background.default};
  padding: 8px 16px;
  margin-top: 20px;
  text-align: left;
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

const ChipPrice = styled(Chip)`
  font-size: 1rem;
`;

const ChipButton = styled(IconButton)`

`;

const ShopTitle = styled(Typography)`
  border: 1px solid #222;
  border-radius: 8px;

  margin-top: 8px;
  margin-bottom: 8px;
  padding: 2px 6px;

  font-size: 13px;
  font-weight: 500;
`;

const Price = styled('div')`
  margin-bottom: 16px;
`;

const ProductDetails = () => {
  const dispatch = useDispatch();
  const currentProduct = useSelector(state => state.products.current);
  const currentShop = useSelector(state => state.shops.current);
  const {basket} = useSelector(state => state.basket);
  const {productId} = useParams();
  const navigate = useNavigate();

  const [added, setAdded] = useState(0);

  const handleClick = () => {
    setAdded(added + 1);
    dispatch(addProduct(currentProduct));
  };

  const handlePlus = () => {
    setAdded(added + 1);
    dispatch(addProduct(currentProduct));
  };

  const handleMinus = () => {
    dispatch(deleteProduct(currentProduct));
    setAdded(added - 1);
  };

  useEffect(() => {
    if (currentProduct) {
      if (!basket) {
        setAdded(0);
      } else if (basket.length > 0) {
        const product = basket.find(p => p.id === productId);
        const count = product ? product.count : 0;

        setAdded(count);
      }
    }
  }, [basket, currentProduct]);


  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate(`/shop/${currentShop.id}`);
      });
    }
  }, [currentProduct]);

  return (currentProduct && currentShop) ? (
    <Base component="div">
      <Image>
        {currentProduct.image && <Photo src={currentProduct.image} alt=""/>}
        {!currentProduct.image && <NoImage>{currentProduct.icon}</NoImage>}
      </Image>
      <Content>
        <ShopTitle sx={{
          borderColor: currentShop.color !== '' ? currentShop.color : 'inherit'
        }}>{currentShop.name}</ShopTitle>
        <Title>{currentProduct.name}</Title>
        <Price>{currentProduct.price} {getCurrencyTitle(currentProduct.currency)}</Price>
        {added === 0 && <ChipPrice color="primary" onClick={handleClick}
                                   label={`Добавить в корзину`}></ChipPrice>}

        {added > 0 && <PlusMinus>
          <ChipButton color="primary" size="small" onClick={handleMinus}><Remove/></ChipButton>
          <span>{added}</span>
          <ChipButton color="primary" size="small" onClick={handlePlus}><Add/></ChipButton>
        </PlusMinus>}

        {currentProduct.about && <Description>{currentProduct.about}</Description>}
      </Content>
    </Base>
  ) : <></>
};

export default ProductDetails;