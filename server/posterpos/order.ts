import {getIncomingOrder} from "../services/posterPos.ts";
import {getOrderByPosterPos} from "../services/airtable.js";
import {updateOrderAction} from "../bot/actions/orderActions.ts";
import {statuses} from "../bot/utils.js";

export const updateOrder = async (posterPosData) => {
  const posterPosOrder = await getIncomingOrder(posterPosData);
  const order = await getOrderByPosterPos(posterPosOrder.id);

  if(posterPosData.action === 'closed') {
    await updateOrderAction({
      ...order,
      status: statuses.COOKED
    });
  } else {
    await updateOrderAction({
      ...order,
      status: posterPosOrder.status
    });
  }
}
