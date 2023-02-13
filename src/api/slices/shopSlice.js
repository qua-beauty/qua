import {createSlice} from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shops',
  initialState: {
    data: null,
    current: null
  },
  reducers: {
    setShopsData: (state, action) => {
      state.data = action.payload;
    },
    setCurrentShop: (state, action) => {
      state.current = action.payload;
    }
  }
});

export const {setShopsData, setCurrentShop} = shopSlice.actions;
export const shopReducer = shopSlice.reducer;