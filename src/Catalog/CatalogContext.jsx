import {createContext} from 'react';

const initialValue = {
  catalog: [],
  category: []
};

const CatalogContext = createContext(initialValue);

export default CatalogContext;