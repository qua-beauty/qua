import {getIncomingOrder} from "../services/posterPos.ts";

export const updateOrder = async (data, type) => {
    const order = getIncomingOrder(data);
    console.log(order);
}