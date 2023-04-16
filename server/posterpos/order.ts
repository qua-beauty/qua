import {getIncomingOrder} from "../services/posterPos.ts";
import shopAcceptOrder from '../bot/actions/shopAcceptOrder.js';

export const updateOrder = async (data, type) => {
  console.log(data);
  const posterOrder = await getIncomingOrder(data);
  console.log(posterOrder);

  if (type === 'changed' && posterOrder.status === 'cook') {
    // await shopAcceptOrder(posterOrder.id);
  }
}