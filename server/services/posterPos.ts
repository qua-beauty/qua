import {getPosterPos} from './airtable.js';
import {serializePosterOrder, serializePosterTransaction} from '../../shared/serializers.js';
import {posterOrderMapper} from '../../shared/mappers.js';

export const createIncomingOrder = async (data) => {
  try {
    const posterPos = await getPosterPos(data.shop.posterPos.id);

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

export const updateIncomingOrder = async (data) => {
  const posterPos = await getPosterPos(data.shop.posterPos.id);

  try {
    await fetch(`https://joinposter.com/api/transactions.updateTransaction?token=${posterPos.accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serializePosterTransaction([data]))
    })
  } catch (e) {
    console(e);
  }
}