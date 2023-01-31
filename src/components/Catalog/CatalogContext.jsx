import {createContext} from 'react';

const initialValue = {
  catalog: [],
  category: [],
  deliveryTeams: []
};

const CatalogContext = createContext(initialValue);

export default CatalogContext;