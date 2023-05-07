import { Response } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import {checkSum} from "./checkSum.ts";
import {updateOrder} from "./order.ts";

const callbackActions = {
  'incoming_order': {
    'changed': (data) => updateOrder(data, 'cook'),
    'closed': (data) => updateOrder(data, 'cooked'),
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

  const action = callbackAction(postData.object, postData.action);

  if(action) {
    await action(postData);
  }

  console.log(postData);


  return {
    status: 200,
    body: 'OK',
  };
};