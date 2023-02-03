import {create} from 'zustand';
import {collection, getDocs} from 'firebase/firestore';
import {firestore} from '../firebase.js';

export const useShopStore = create((set, get) => ({
  loaded: false,
  shops: null,
  getShop: (shopId) => {
    const shops = get().shops;

    if (shops.some((shop) => shop.id === shopId)) {
      return shops.find(shop => shop.id === shopId);
    }
  },
  fetchShops: async () => {
    const shops = [];

    await getDocs(collection(firestore, 'shops')).then(docs => {
      docs.forEach((doc) => {
        const data = doc.data();
        if (!data.disabled) {
          shops.push({
            id: doc.id,
            ...data
          });
        }
      });
    });

    set({shops, loaded: true});
  },
}));