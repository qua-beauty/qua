import {collection, getDocs} from 'firebase/firestore';
import {firestore} from '../firebase.js';
import {useEffect, useState} from 'react';
import CatalogContext from './CatalogContext.jsx';

const CatalogProvider = ({children, ...rest}) => {
  const [loaded, setLoaded] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [category, setCategory] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilter = (key, value) => {
    if (filters.hasOwnProperty(key) && filters[key] === value) {
      const newFilters = {...filters};
      delete newFilters[key];
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        [key]: value
      });
    }
  };

  const getCatalog = () => {
    const filterKeys = Object.keys(filters);
    const singleCategory = category.filter(cat => cat.type === 'single').map(cat => cat.id);

    return catalog.filter((eachObj) => {
      if (eachObj.category.some(r => singleCategory.includes(r)) && !filters?.category?.includes(eachObj.category)) {
        return false;
      }

      return filterKeys.every((eachKey) => {
        if (!filters[eachKey].length) {
          return true;
        }

        return filters[eachKey].includes(eachObj[eachKey]);
      });
    });
  };

  useEffect(() => {
    const newCatalog = [];
    const newCategory = [];

    getDocs(collection(firestore, 'catalog')).then(docs => {
      docs.forEach((doc) => {
        newCatalog.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setLoaded(true);
      setCatalog(newCatalog);
    });

    getDocs(collection(firestore, 'category')).then(docs => {
      docs.forEach((doc) => {
        newCategory.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setCategory(newCategory);
    });
  }, []);

  return (
    <CatalogContext.Provider value={{
      catalog: getCatalog(),
      category,
      filters,
      catalogLoaded: loaded,
      filter: handleFilter
    }} {...rest}>
      {children}
    </CatalogContext.Provider>
  );
};

export default CatalogProvider;