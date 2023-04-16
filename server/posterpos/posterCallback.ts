import { Response } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import {checkSum} from "./checkSum.ts";
import {addShop} from "./addShop.ts";

const callbackActions = {
  'application': {
    'added': addShop
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
    await action();
  }

  console.log('validated', postData);
  console.log(postData?.data);

  return {
    status: 200,
    body: 'OK',
  };
};