import {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsByShop } from '../api/slices/productSlice.js';
import Details from "../components/Shop/Details";
import Products from "../components/Shop/Products.jsx";
import Reviews from "../components/Shop/Reviews";
import Schedule from "../components/Shop/Schedule";
import { Flex } from '@chakra-ui/react';
import { makeBook } from '../api/slices/bookingSlice.js';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentShop = useSelector(state => state.shops.current);
  const filters = useSelector((state) => state.filters.filters);

  const products = useSelector(selectProductsByShop(currentShop?.id));


  const handleSelect = useCallback((product) => {
    console.log(product)
    dispatch(makeBook(product));
    navigate('/booking');
  }, [navigate]);

  console.log(products)

  return (
    <Flex direction='column' color={'text.primary'} gap='32px'>
      <Details master={currentShop} />
      <Products products={products} onSelect={handleSelect} />
      <Reviews />
      <Schedule />
    </Flex>
  );
};

export default Shop;
