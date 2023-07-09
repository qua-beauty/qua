import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsByShop } from '../api/slices/productSlice.js';
import { selectReviewsByShop } from '../api/slices/reviewSlice.js';
import Details from "../components/Shop/Details";
import Products from "../components/Shop/Products.jsx";
import Reviews from "../components/Shop/Reviews";
import WorkTime from "../components/Shop/WorkTime";
import { Flex } from '@chakra-ui/react';
import { makeBook } from '../api/slices/bookingSlice.js';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentShop = useSelector(state => state.shops.current);

  const products = useSelector(selectProductsByShop(currentShop?.id));
  const reviews = useSelector(selectReviewsByShop(currentShop?.id));

  const handleSelect = useCallback((product) => {
    dispatch(makeBook(product));
    navigate('/booking');
  }, [navigate]);


  return (
    <Flex direction='column' color={'text.primary'} gap='32px' p='16px 0 10rem'>
      <BackButton onClick={() => navigate(-1)} />
      <Details master={currentShop} />
      <Products products={products} onSelect={handleSelect} />
      <Reviews reviews={reviews} />
      <WorkTime workTime={currentShop?.workTime} />
    </Flex>
  );
};

export default Shop;
