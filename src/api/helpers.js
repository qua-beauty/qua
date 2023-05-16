import store from './store.js';

export const getShopName = (shopId) => {
  if(shopId)
    return store.getState().shops?.data?.find(s => s.id === shopId).name;

  return null;
}