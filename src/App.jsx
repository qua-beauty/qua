import React, {useEffect, useState} from 'react';
import {Chip, styled} from '@mui/material';
import Product from './Product.jsx';
import {firestore} from './firebase.js';
import {addDoc, collection, getDocs, getDoc, onSnapshot, setDoc, updateDoc, deleteDoc} from 'firebase/firestore';

const Base = styled('div')`
  padding: 20px;
`;

const Tags = styled('div')`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  
  margin-bottom: 16px;  
  
  > * {
    margin-left: 8px;
  }
`;

const Catalog = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;


function App() {
  const [catalog, setCatalog] = useState(null);

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
      return newCatalog;
    })
  }, []);

  console.log(catalog);
  return (
    <Base className="App">
      <Tags>
        <Chip label="🥐 Breakfast" variant="outlined" />
        <Chip label="🥪 Main" variant="outlined" />
        <Chip label="🥗 Salads" variant="outlined" />
        <Chip label="🥤 Drinks" variant="outlined" />
      </Tags>
      <Catalog>
        {catalog && catalog.map(product => {
          return <Product {...product} />
        })}
      </Catalog>
    </Base>
  );
}

export default App;
