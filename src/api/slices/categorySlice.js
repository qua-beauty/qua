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

export const {setCategoriesData} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;