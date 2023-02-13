import Shop from './Shop.jsx';
import {styled, Typography} from '@mui/material';
import {webApp} from '../telegram.js';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {useNavigate} from 'react-router-dom';

const Base = styled('div')`
  padding: 16px;
`;

const Title = styled(Typography)`
  margin-bottom: 16px;
`;

const ShopList = styled(Typography)`
  margin: 0 -16px;
`;

const Shops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shops = useSelector(state => state.shops.data);

  const handleSelect = (shop) => {
    dispatch(setCurrentShop(shop));
    navigate(`/shop/${shop.id}`);
  };

  if (webApp) {
    webApp.BackButton.hide();
  }

  return shops ? (
    <Base>
      <Title variant="subtitle1">Выберите магазин с продуктами</Title>
      <ShopList>
        {shops.map(shop => (
          <Shop onSelect={handleSelect} key={shop.name} {...shop}/>
        ))}
      </ShopList>
    </Base>
  ) : <></>;
};

export default Shops;