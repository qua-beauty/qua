import {styled} from '@mui/material';
import Product from './Product.jsx';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setCurrentProduct} from '../api/slices/productSlice.js';

const Base = styled('div')`
  padding: 16px 4px 96px;

  max-width: 800px;
  margin: -10px auto 0;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;

  @media (min-width: 560px) {
    grid-template-columns: 33% 33% 33%;
  }

  @media (min-width: 720px) {
    grid-template-columns: 25% 25% 25% 25%;
  }
`;

const Catalog = ({catalog}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (product) => {
    dispatch(setCurrentProduct(product));
    navigate(`product/${product.id}`);
  }

  return <Base>
    {catalog.map(product => {
      return <Product onSelect={() => handleSelect(product)} key={product.id} {...product} />;
    })}
  </Base>;
};

export default Catalog;
