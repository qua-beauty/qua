import {collection, getDocs} from 'firebase/firestore';
import {firestore} from '../firebase.js';
import {create} from 'zustand';

export const useCatalogStore = create((set, get) => ({
  catalog: null,
  categories: null,
  getProduct: (productId) => get().catalog.filter(product => product.id === productId)[0],
  getCategory: (categoryId) => get().categories.filter(category => category.id === categoryId)[0],
  getFilteredCatalog: (filters, shopId) => {
    const filterKeys = Object.keys(filters);
    let targetCatalog = get().catalog;

    if(shopId) {
      targetCatalog = targetCatalog.filter(product => product.shopId === shopId);
    }

    return targetCatalog.filter((eachObj) => {
      return filterKeys.every((eachKey) => {
        if (!filters[eachKey].length) {
          return true;
        }

        return eachObj[eachKey].includes(filters[eachKey]);
      });
    });
  },

  fetchCategories: async () => {
    const categories = [];

    await getDocs(collection(firestore, 'category')).then(docs => {
      docs.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });

    set({ categories });
  },
  fetchCatalog: async (shops, categories) => {
    const catalog = [];

    await getDocs(collection(firestore, 'catalog')).then(docs => {
      docs.forEach((doc) => {
        const data = doc.data();
        const cat = categories.filter(category => category.id === data.category[0])[0];
        const shop = shops.filter(shop => shop.id === data.shopId)[0];

        if(shop) {
          catalog.push({
            id: doc.id,
            icon: cat ? cat.icon : '',
            shop, // TODO: rewrite it
            shopTitle: shop ? shop.title : '',
            shopColor: shop ? shop.color : '',
            ...data
          });
        }
      });
    });

    set({ catalog });
  }
}))