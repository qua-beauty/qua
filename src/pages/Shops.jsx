import {useShopStore} from '../store/shopStore.js';
import Shop from '../components/Shop.jsx';
import {styled, Typography} from '@mui/material';
import {webApp} from '../telegram.js';

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
  const {shops} = useShopStore();

  if(webApp) {
    webApp.BackButton.hide();
  }

  return shops ? (
    <Base>
      <Title variant="subtitle1">Выберите магазин с продуктами</Title>
      <ShopList>
        {shops.map(shop => (
          <Shop key={shop.id}
                id={shop.id}
                title={shop.title}
                address={shop.address}
                image={shop.image}
                workTime={shop.workTime}/>
        ))}
      </ShopList>
    </Base>
  ) : <></>;
};

export default Shops;