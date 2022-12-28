import React, {useContext, useEffect, useState} from 'react';
import {Box, Chip, styled, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import CatalogContext from '../Catalog/CatalogContext.jsx';
import {webApp} from '../../telegram.js';
import {getCurrencyTitle} from '../../utils.js';
import BasketContext from '../Basket/BasketContext.jsx';

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
  padding: 20px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  overflow: hidden;

  position: relative;
`;

const Photo = styled('img')`
  position: relative;
  z-index: 1;
`;

const Backdrop = styled('img')`
  position: absolute;
  left: 0;
  width: 100%;
  height: 300px;
  filter: blur(40px)
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

const ChipButton = styled(Chip)`
  background: ${({ theme }) => theme.palette.background.paper};
  width: 40px;
  height: 32px;
`;


const ProductDetails = () => {
  const {getProduct} = useContext(CatalogContext);
  const {addProduct, deleteProduct, basket} = useContext(BasketContext);
  const {productId} = useParams();
  const product = getProduct(productId);
  const {title, photo, description, price, currency, time, id} = product || {};
  const navigate = useNavigate();

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
    } else if (basket.products && basket.products.length > 0) {
      const product = basket.products.find(p => p.id === id);
      const count = product ? product.count : 0;

      setAdded(count);
    }
  }, [basket])

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate('/');
      });
    }
  }, []);

  return (
    <Base component="div">
      <Image>
        <Photo src={photo} alt=""/>
        <Backdrop src={photo} alt=""/>
      </Image>
      <Content>
        <Title>{title}</Title>
        {added === 0 && <ChipPrice color="secondary" onClick={handleClick}
                              label={`${price} ${getCurrencyTitle(currency)}${time ? (' 􀐱' + time) : ''}`}></ChipPrice>}

        {added > 0 && <PlusMinus>
          <ChipButton label="􀅽" onClick={handleMinus}></ChipButton>
          <span>{added}</span>
          <ChipButton label="􀅼" onClick={handlePlus}></ChipButton>
        </PlusMinus>}

        <Description>{description}</Description>
      </Content>
    </Base>
  );
};

export default ProductDetails;