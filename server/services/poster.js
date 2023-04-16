import {getPoster} from './airtable.js';
import {serializePosterOrder} from '../../shared/serializers.js';

export const createIncomingOrder = async (data) => {
  console.log(data);

  try {
    const poster = await getPoster(data.shop.id);

    await fetch(`https://joinposter.com/api/incomingOrders.createIncomingOrder?token=${poster.accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serializePosterOrder([data]))
    }).then(response => response.json())
      .then(data => console.log(data));
  } catch (e) {
    console.log(e);
    return null;
  }
};