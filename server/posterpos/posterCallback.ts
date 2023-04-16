import { Response } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import {checkSum} from "./checkSum.ts";
import {addShop} from "./addShop.ts";
import {updateOrder} from "./order.ts";

const callbackActions = {
  'application': {
    'added': addShop
  },
  'incoming_order': {
    'changed': (data) => updateOrder(data, 'changed'),
    'closed': (data) => updateOrder(data, 'closed'),
  }
}

const callbackAction = (object, action) => {
  if(callbackActions.hasOwnProperty(object) && callbackActions[object].hasOwnProperty(action)) {
    return callbackActions[object][action];
  }

  return undefined;
}

export const posterCallback = async (
    postData: Record<string, string | undefined>,
): Promise<Response> => {

  const validate = checkSum(postData);
  if(!validate) {
    throw new Error('Checksum is not valid');
  }

  console.log(postData);

  try {
    const action = callbackAction(postData.object, postData.action);

    if(action) {
      await action(postData);
    }
  } catch (e) {
    console.log(e);
  }

  return {
    status: 200,
    body: 'OK',
  };
};