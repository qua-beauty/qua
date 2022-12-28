import {collection, getDocs} from 'firebase/firestore';
import {firestore} from '../../firebase.js';
import {useEffect, useState} from 'react';
import CatalogContext from './CatalogContext.jsx';
import {useParams} from 'react-router-dom';

const CatalogProvider = ({children, ...rest}) => {
  const [loaded, setLoaded] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const {shopId} = useParams();

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
    const singleCategories = categories.filter(cat => cat.type === 'single').map(cat => cat.id);

    return catalog.filter((eachObj) => {
      if (eachObj.category.some(r => singleCategories.includes(r)) && !filters?.category?.includes(eachObj.category)) {
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
    const newCategories = [];

    getDocs(collection(firestore, 'category')).then(docs => {
      docs.forEach((doc) => {
        newCategories.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setCategories(newCategories);
    });
  }, []);

  useEffect(() => {
    const newCatalog = [];

    getDocs(collection(firestore, 'catalog')).then(docs => {
      docs.forEach((doc) => {
        const data = doc.data();
        const cat = categories.filter(category => category.id === data.category[0])[0];

        if(shopId && data.shopId !== shopId) return;

        newCatalog.push({
          id: doc.id,
          icon: cat ? cat.icon : null,
          ...data
        });
      });

      setLoaded(true);
      setCatalog(newCatalog);
    });
  }, [categories])

  return (
    <CatalogContext.Provider value={{
      catalog: getCatalog(),
      getProduct: (productId) => catalog.filter(product => product.id === productId)[0],
      getCategory: (categoryId) => categories.filter(category => category.id === categoryId)[0],
      catalogByShop: () => getCatalog(),
      category: categories,
      filters,
      catalogLoaded: loaded,
      filter: handleFilter
    }} {...rest}>
      {children}
    </CatalogContext.Provider>
  );
};

export default CatalogProvider;