import Shop from './Shop.jsx';
import {Box, styled, Typography} from '@mui/material';
import {webApp} from '../telegram.js';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const Base = styled('div')`
  padding: 8px;
`;

const Title = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 0.875rem;
  text-align: center;
`;

const ShopList = styled(Box)`
  
`;

const Shops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shops = useSelector(state => state.shops.data);
  const {t} = useTranslation();

  const handleSelect = (shop) => {
    dispatch(setCurrentShop(shop));
    navigate(`/shop/${shop.id}`);
  };

  if (webApp) {
    webApp.BackButton.hide();
  }

  return shops ? (
    <Base>
      <Title variant="subtitle1">{t('catalogTitle')}</Title>
      <ShopList>
        {shops.map(shop => (
          <Shop onSelect={handleSelect} key={shop.name} {...shop}/>
        ))}
      </ShopList>
    </Base>
  ) : <></>;
};

export default Shops;