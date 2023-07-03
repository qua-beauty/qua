import {useDispatch, useSelector} from 'react-redux';
import Details from "../components/Shop/Details";
import Services from "../components/Shop/Services";
import Reviews from "../components/Shop/Reviews";
import Schedule from "../components/Shop/Schedule";

const Shop = () => {
  const currentShop = useSelector(state => state.shops.current);

  return (
    <div className="relative bg-text-white w-full overflow-hidden flex flex-col items-center justify-start gap-[0.81rem]">
      <Details master={currentShop} />
      <Services />
      <Reviews />
      <Schedule />
    </div>
  );
};

export default Shop;
