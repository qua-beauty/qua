import {collection, getDocs} from 'firebase/firestore';
import {firestore} from './firebase.js';

const getCatalog = async () => {
  const catalog = [];
  const docs = await getDocs(collection(firestore, "catalog"));

  docs.forEach((doc) => {
    catalog.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return catalog;
}

export {
  getCatalog
}