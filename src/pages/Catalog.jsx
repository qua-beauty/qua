import Filters from '../components/Catalog/Filters.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectProductsByShop, setCurrentProduct} from '../api/slices/productSlice.js';
import {Box, Flex} from '@chakra-ui/react';
import {useEffect} from 'react';
import {setCurrentShop} from '../api/slices/shopSlice.js';
import {useNavigate} from 'react-router-dom';
import ProductItem from '../components/Catalog/ProductItem.jsx';

function Catalog() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state.shops.current);
  const filters = useSelector((state) => state.filters.filters);
  const shops = useSelector(state => state.shops.data);
  const catalog = useSelector(selectProductsByShop(currentShop?.id, filters));
  const navigate = useNavigate();

  const handleSelect = (product) => {
    dispatch(setCurrentProduct(product));
    navigate(`product/${product.id}`);
  }

  useEffect(() => {
    if(shops) {
      dispatch(setCurrentShop(shops[0]))
    }
  }, [shops])

  return currentShop ? (
    <>
      <Filters shopId={currentShop.id}/>
      <Flex alignItems={'center'} gap={10} pb={'56px'} direction={'column'}>
        {catalog.map(product => {
          return <ProductItem onSelect={() => handleSelect(product)} key={product.id} {...product} />;
        })}
      </Flex>
    </>
  ) : <></>;
}

export default Catalog;
