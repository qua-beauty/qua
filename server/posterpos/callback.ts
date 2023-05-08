import { Response } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import {checkSum} from "./checkSum.ts";
import {updateOrder} from "./order.ts";

const callbackActions = {
  'incoming_order': updateOrder
}

const callbackAction = (object) => {
  if(callbackActions.hasOwnProperty(object)) {
    return callbackActions[object];
  }

  return undefined;
}

export const posterCallback = async (
  posterPosData: Record<string, string | undefined>,
): Promise<Response> => {

  const validate = checkSum(posterPosData);

  if(validate) {
    try {
      const action = callbackAction(posterPosData.object);

      if(action) {
        await action(posterPosData);
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    console.error('Checksum is not valid');
  }

  return {
    status: 200,
    body: 'OK',
  };
};