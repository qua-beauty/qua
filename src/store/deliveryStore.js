import {collection, getDocs} from 'firebase/firestore';
import {firestore} from '../firebase.js';
import {create} from 'zustand';

export const useDeliveryStore = create((set) => ({
  deliveryTeams: null,
  fetchDeliveryTeams: async () => {
    const deliveryTeams = [];

    await getDocs(collection(firestore, 'deliveryTeams')).then(docs => {
      docs.forEach((doc) => {
        const data = doc.data();
        if(!data.disabled) {
          deliveryTeams.push({
            id: doc.id,
            ...data
          });
        }
      });
    });

    set({ deliveryTeams })
  }
}))