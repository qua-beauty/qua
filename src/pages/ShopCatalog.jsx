import {styled, Typography} from '@mui/material';
import Filters from '../components/Filters/Filters.jsx';
import Catalog from '../components/Catalog/Catalog.jsx';
import {useEffect, useState} from 'react';
import {useCatalogStore} from '../store/catalogStore.js';
import {useFilterStore} from '../store/filterStore.js';
import {webApp} from '../telegram.js';
import {useNavigate, useParams} from 'react-router-dom';
import {useShopStore} from '../store/shopStore.js';
import ShareButton from '../components/ShareButton.jsx';
import {getShopUrl} from '../utils.js';

const Base = styled('div')`

`;

const Header = styled('header')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
  text-align: left;
  width: 100%;

  position: relative;
`;

const Thumbnail = styled('div')`
  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 50%;
`;

const Image = styled('img')`
  max-width: 100%;
`;

const Info = styled('div')`
  margin-left: 16px;
`;

const Share = styled('div')`
  position: absolute;
  top: 16px;
  right: 2px;
`;

const Title = styled(Typography)``;
const Address = styled(Typography)``;
const Instagram = styled('a')``;

function ShopCatalog() {
  const [shop, setShop] = useState(null);
  const {shopId} = useParams();
  const navigate = useNavigate();
  const [filteredCatalog, setFilteredCatalog] = useState(null);
  const {catalog, getFilteredCatalog} = useCatalogStore();
  const {filters} = useFilterStore();
  const {shops, getShop, setCurrentShopId} = useShopStore();

  useEffect(() => {
    if(catalog && filters) {
      setFilteredCatalog(getFilteredCatalog(filters, shopId));
    }
  }, [catalog, filters]);

  useEffect(() => {
    if(shops) {
      const shop = getShop(shopId);
      setShop(shop);
    }
  }, [shops]);

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate('/');
      });
    }
  }, []);

  return shop ? (
    <Base>
      <Header>
        <Thumbnail>
          <Image src={shop.image}></Image>
        </Thumbnail>
        <Info>
          <Title variant="subtitle1">{shop.title}</Title>
          <Address variant="subtitle2">{shop.address}, {shop.workTime}</Address>
          <Instagram href={shop.instagram}></Instagram>
        </Info>
        <Share>
          <ShareButton title={shop.title} url={getShopUrl(shop.id)} />
        </Share>
      </Header>
      <Filters shopId={shop.id}/>
      <Catalog catalog={filteredCatalog}/>
    </Base>
  ) : <></>;
}

export default ShopCatalog;
