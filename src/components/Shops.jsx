import Shop from './Shop.jsx';
import {webApp} from '../telegram.js';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Box, Flex, Heading} from '@chakra-ui/react';

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
    <Box p={'8px'}>
      <Heading variant="subtitle1">{t('catalogTitle')}</Heading>
      <Flex>
        {shops.map(shop => (
          <Shop onSelect={handleSelect} key={shop.name} {...shop}/>
        ))}
      </Flex>
    </Box>
  ) : <></>;
};

export default Shops;