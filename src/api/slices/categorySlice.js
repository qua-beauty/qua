import {createSelector, createSlice} from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: null,
  },
  reducers: {
    setCategoriesData: (state, action) => {
      state.data = action.payload;
    },
  }
});

const categorySelector = (state) => state.categories;

export const selectCategoriesByShopId = (shopId) => (
  createSelector(categorySelector, (categories) => {
    return categories.data ? categories.data.filter(c => (c.shops.includes(shopId) && c.products)) : [];
  })
)

export const {setCategoriesData} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;