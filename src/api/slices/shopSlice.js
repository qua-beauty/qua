import {createSlice} from '@reduxjs/toolkit';

export const shopTypes = {
  RESTAURANT: 'master',
  DEV: 'dev'
}

export const shopSlice = createSlice({
  name: 'masters',
  initialState: {
    data: null,
    current: null
  },
  reducers: {
    setShopsData: (state, action) => {
      state.data = action.payload;
    },
    setShopLikes: (state, action) => {
      state.current.likes = action.payload;
    },
    setCurrentShop: (state, action) => {
      state.current = action.payload;
    }
  }
});

export const {setShopsData, setCurrentShop, setShopLikes} = shopSlice.actions;
export const shopReducer = shopSlice.reducer;