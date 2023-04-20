import {getPosterPos} from './airtable.js';
import {serializePosterOrder} from '../../shared/serializers.js';
import {posterOrderMapper} from '../../shared/mappers.js';

export const createIncomingOrder = async (data) => {
  try {
    const posterPos = await getPosterPos(data.shop.posterPos.account);

    return await fetch(`https://joinposter.com/api/incomingOrders.createIncomingOrder?token=${posterPos.accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serializePosterOrder([data]))
    }).then(response => response.json())
      .then(data => posterOrderMapper(data.response));
  } catch (e) {
    console.log(e);
    return null;
  }
};