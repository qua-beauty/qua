import {createSelector, createSlice} from '@reduxjs/toolkit';

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

const shopSelector = (state) => state.shops;

export const selectShopsByFilters = (filters) => (
  createSelector(shopSelector, (shops) => {
    if(!filters) {
      return shops.data;
    }

    const filterKeys = Object.keys(filters);

    return shops?.data?.filter((shop) => {
      return filterKeys.every((eachKey) => {
        if (!filters[eachKey].length) {
          return true;
        }

        return shop[eachKey].id === filters[eachKey];
      });
    });
  })
)

export const {setShopsData, setCurrentShop, setShopLikes} = shopSlice.actions;
export const shopReducer = shopSlice.reducer;