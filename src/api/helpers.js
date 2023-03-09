import store from './store.js';

export const getCategoryName = (categoryId, lng) => {
  if(categoryId)
    return store.getState().categories?.data?.find(c => c.id === categoryId).name[lng];

  return null;
}

export const getShopName = (shopId) => {
  if(shopId)
    return store.getState().shops?.data?.find(s => s.id === shopId).name;

  return null;
}

export const getProductCount = (productId) => {
  const basket = store.getState().basket.basket;
  if (productId && basket.length > 0) {
    const product = basket.find(p => p.id === productId)
    return product ? product.count : null
  }

  return null;
}