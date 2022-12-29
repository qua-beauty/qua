import {useEffect, useState} from 'react';
import CatalogContext from './CatalogContext.jsx';
import {fetchCatalog, fetchCategories, fetchShops} from '../../services.js';

const CatalogProvider = ({children, ...rest}) => {
  const [loaded, setLoaded] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
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
    Promise.all([fetchShops(), fetchCategories()]).then(([shops, categories]) => {
      console.log(shops, categories)

      fetchCatalog(shops, categories).then((catalog) => {
        setCatalog(catalog);
        setShops(shops);
        setCategories(categories);
        setLoaded(true);
      })
    })

  }, []);

  return (
    <CatalogContext.Provider value={{
      catalog: getCatalog(),
      getProduct: (productId) => catalog.filter(product => product.id === productId)[0],
      getCategory: (categoryId) => categories.filter(category => category.id === categoryId)[0],
      catalogByShop: () => getCatalog(),
      category: categories,
      shops: shops,
      filters,
      catalogLoaded: loaded,
      filter: handleFilter
    }} {...rest}>
      {children}
    </CatalogContext.Provider>
  );
};

export default CatalogProvider;