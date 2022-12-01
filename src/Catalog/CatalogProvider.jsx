import {collection, getDocs} from 'firebase/firestore';
import {firestore} from '../firebase.js';
import {useEffect, useState} from 'react';
import CatalogContext from './CatalogContext.jsx';

const CatalogProvider = ({ children, ...rest }) => {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const newCatalog = [];

    getDocs(collection(firestore, "catalog")).then(docs => {
      docs.forEach((doc) => {
        newCatalog.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setCatalog(newCatalog);
    })
  }, [])

  return (
    <CatalogContext.Provider value={{
      catalog,
      getProductById: (productId) => catalog.filter(product => product.id === productId)[0]
    }} {...rest}>
      {children}
    </CatalogContext.Provider>
  )
}

export default CatalogProvider;