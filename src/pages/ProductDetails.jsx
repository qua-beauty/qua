import React, {useContext, useEffect, useState} from 'react';
import {Box, Chip, IconButton, styled, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {webApp} from '../telegram.js';
import {getCurrencyTitle} from '../utils.js';
import BasketContext from '../components/Basket/BasketContext.jsx';
import {Add, Remove} from '@mui/icons-material';
import {useCatalogStore} from '../store/catalogStore.js';

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
  const {catalog, getProduct} = useCatalogStore();
  const [product, setProduct] = useState(null);
  const {addProduct, deleteProduct, basket} = useContext(BasketContext);
  const {productId} = useParams();
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
    if(catalog) {
      const product = getProduct(productId);
      setProduct(product);
    }
  }, [catalog])

  useEffect(() => {
    if(product) {
      if (!basket) {
        setAdded(0);
      } else if (basket.products && basket.products.length > 0) {
        const product = basket.products.find(p => p.id === productId);
        const count = product ? product.count : 0;

        setAdded(count);
      }
    }
  }, [basket, product]);

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate(`/shop/${product.shop.id}`);
      });
    }
  }, [product]);


  return product ? (
    <Base component="div">
      <Image>
        {product.photo && <Photo src={product.photo} alt=""/>}
        {!product.photo && <NoImage>{product.icon}</NoImage>}
      </Image>
      <Content>
        <ShopTitle sx={{
          borderColor: product.shopColor !== '' ? product.shopColor : 'inherit'
        }}>{product.shopTitle}</ShopTitle>
        <Title>{product.title}</Title>
        <Price>{product.price} {getCurrencyTitle(product.currency)}</Price>
        {added === 0 && <ChipPrice color="primary" onClick={handleClick}
                                   label={`Добавить в корзину`}></ChipPrice>}

        {added > 0 && <PlusMinus>
          <ChipButton color="primary" size="small" onClick={handleMinus}><Remove/></ChipButton>
          <span>{added}</span>
          <ChipButton color="primary" size="small" onClick={handlePlus}><Add/></ChipButton>
        </PlusMinus>}

        {product.description && <Description>{product.description}</Description>}
      </Content>
    </Base>
  ) : <></>
};

export default ProductDetails;