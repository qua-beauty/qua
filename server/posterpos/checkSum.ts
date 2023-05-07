import {Md5Hash} from './md5.ts';

export const checkSum = (postData: Record<string, string | undefined>): boolean => {
  const client_secret = Deno.env.get('POSTER_APPLICATION_SECRET');

  const verifyOriginal = postData.verify;
  delete postData.verify;

  const verify = [
    postData.account,
    postData.object,
    postData.object_id,
    postData.action,
  ];

  // If there are additional parameters
  if (postData.data !== undefined) {
    verify.push(postData.data);
  }
  verify.push(postData.time);
  verify.push(client_secret);

  const verifyString = verify.join(';');
  const verifyHash = new Md5Hash().digestString(verifyString).hex();

  return verifyHash === verifyOriginal;
};