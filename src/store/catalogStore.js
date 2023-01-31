import {collection, getDocs} from 'firebase/firestore';
import {firestore} from '../firebase.js';
import {create} from 'zustand';

export const useCatalogStore = create((set, get) => ({
  catalog: [],
  shops: [],
  categories: [],
  getProduct: (productId) => get().catalog.filter(product => product.id === productId)[0],
  getCategory: (categoryId) => get().categories.filter(category => category.id === categoryId)[0],
  getFilteredCatalog: (filters) => {
    const filterKeys = Object.keys(filters);
    const singleCategories = get().categories.filter(cat => cat.type === 'single').map(cat => cat.id);
    return get().catalog.filter((eachObj) => {
      if (eachObj.category.some(r => singleCategories.includes(r)) && !filters?.category?.includes(eachObj.category)) {
        return false;
      }

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
  fetchShops: async () => {
    const shops = [];

    await getDocs(collection(firestore, 'shops')).then(docs => {
      docs.forEach((doc) => {
        const data = doc.data();
        if(!data.disabled) {
          shops.push({
            id: doc.id,
            ...data
          });
        }
      });
    });

    set({ shops });
  },
  fetchCatalog: async (shops, categories, shopId) => {
    const catalog = [];

    await getDocs(collection(firestore, 'catalog')).then(docs => {
      docs.forEach((doc) => {
        const data = doc.data();
        const cat = categories.filter(category => category.id === data.category[0])[0];
        const shop = shops.filter(shop => shop.id === data.shopId)[0];

        if(shop && (shopId ? shopId === shop.id : true)) {
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