import {createSlice} from '@reduxjs/toolkit';

const shopTypes = {
  RESTAURANT: 'restaurant',
  MARKET: 'market'
}

export const shopSlice = createSlice({
  name: 'shops',
  initialState: {
    data: null,
    market: null,
    current: null
  },
  reducers: {
    setShopsData: (state, action) => {
      state.data = action.payload.filter(s => s.type === shopTypes.RESTAURANT);
      state.market = action.payload.find(s => s.type === shopTypes.MARKET);
    },
    setCurrentShop: (state, action) => {
      state.current = action.payload;
    }
  }
});

export const {setShopsData, setCurrentShop} = shopSlice.actions;
export const shopReducer = shopSlice.reducer;