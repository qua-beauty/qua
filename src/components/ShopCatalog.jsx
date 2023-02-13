import {styled, Typography} from '@mui/material';
import Filters from './Filters.jsx';
import Catalog from './Catalog.jsx';
import {useEffect} from 'react';
import {webApp} from '../telegram.js';
import {useNavigate, useParams} from 'react-router-dom';
import ShareButton from './ShareButton.jsx';
import {getCurrencyTitle, getShopUrl} from '../utils.js';
import {useSelector} from 'react-redux';
import {selectProductsByShop} from '../api/slices/productSlice.js';

const Base = styled('div')`

`;

const Header = styled('header')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
  text-align: left;
  width: 100%;

  position: relative;
`;

const Thumbnail = styled('div')`
  width: 108px;
  height: 108px;
  overflow: hidden;
  border-radius: 50%;
  margin-top: 8px;
`;

const Image = styled('img')`
  max-width: 100%;
`;

const Info = styled('div')`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`;

const Share = styled('div')`
  position: absolute;
  top: 16px;
  right: 2px;
`;

const About = styled(Typography)`
  margin-top: 8px;
  text-align: center;
`;

const Title = styled(Typography)`
  font-weight: 700;
  margin-top: 16px;
`;
const Address = styled(Typography)`
  text-align: center;
  margin-top: 8px;
`;
const WorkTime = styled(Typography)`
  text-align: center;
  margin-top: 8px;
`;

const Delivery = styled(Typography)`
  margin-top: 2px;
`;

const Instagram = styled('a')``;

function ShopCatalog() {
  const {shopId} = useParams();
  const navigate = useNavigate();
  const currentShop = useSelector((state) => state.shops.current);
  const filters = useSelector((state) => state.filters.filters);
  const catalog = useSelector(selectProductsByShop(shopId, filters));

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate('/');
      });
    }
  }, []);

  return currentShop ? (
    <Base>
      <Header>
        <Thumbnail>
          <Image src={currentShop.image}></Image>
        </Thumbnail>
        <Info>
          <Title variant="subtitle1">{currentShop.name}</Title>
          <WorkTime variant="subtitle2"> 🕔 {currentShop.workTime}</WorkTime>
          <Delivery variant="subtitle2">🚚 Доставка {currentShop.deliveryPrice} {getCurrencyTitle('LKR')}</Delivery>
          <Address variant="subtitle2"> {currentShop.address}</Address>
          <About variant="body2">{currentShop.about}</About>
          <Instagram href={currentShop.instagram}></Instagram>
        </Info>
        <Share>
          <ShareButton title={currentShop.title} url={getShopUrl(currentShop.id)}/>
        </Share>
      </Header>
      <Filters shopId={currentShop.id}/>
      <Catalog catalog={catalog}/>
    </Base>
  ) : <></>;
}

export default ShopCatalog;
