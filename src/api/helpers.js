import store from './store.js';

export const getCategoryName = (categoryId, lng) => {
  if(categoryId)
    return store.getState().categories.data.find(c => c.id === categoryId).name[lng];

  return null;
}