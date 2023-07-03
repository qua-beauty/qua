import {useDispatch, useSelector} from 'react-redux';
import Details from "../components/Shop/Details";
import Services from "../components/Shop/Services";
import Reviews from "../components/Shop/Reviews";
import Schedule from "../components/Shop/Schedule";

const Shop = () => {
  const currentShop = useSelector(state => state.shops.current);

  return (
    <Box color={text.primary}>
      <Details master={currentShop} />
      <Services />
      <Reviews />
      <Schedule />
    </Box>
  );
};

export default Shop;
