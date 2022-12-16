import {collection, doc, getDoc} from 'firebase/firestore';
import {firestore, siteUrl} from './firebase.js';

const saveOrder = async (userId, orderSnap) => {
  const userRef = doc(collection(firestore, 'users'), userId);
  const userSnap = await getDoc(userRef);
  const clientId = userSnap.data().clientId;

  await fetch(`${siteUrl}/api/salebotCreateOrder`, {
    method: 'POST',
    body: JSON.stringify({
      user_id: userSnap.id,
      client_id: clientId,
      order_id: orderSnap.id
    })
  });
}

const salebot = {
  saveOrder
}

export default salebot;