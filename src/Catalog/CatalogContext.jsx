import {createContext} from 'react';

const initialValue = {
  catalog: [],
};

const CatalogContext = createContext(initialValue);

export default CatalogContext;