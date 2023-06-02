import {createSlice} from '@reduxjs/toolkit';

const calculateBasketParams = (basket) => {
  let totalCount = 0;
  let totalPrice = 0;
  basket.forEach(product => {
    if (!product.isDeleted) {
      totalCount += parseInt(product.count);
      totalPrice += parseInt(product.count) * parseInt(product.discountPrice || product.price);
    } else {
      product.count = 0; // set count of deleted product to 0
    }
  });
  return [totalCount, totalPrice];
};

const bookingSlice = createSlice({
  name: 'basket',
  initialState: {
    order: null,
    basket: [],
    count: 0,
    price: 0,
    currency: 'USD',
    shop: null
  },
  reducers: {
    clearDeletedBasket: (state) => {
      const newBasket = state.basket.filter(p => !p.isDeleted);
      const params = calculateBasketParams(newBasket);

      state.basket = newBasket;
      state.count = params[0];
      state.price = params[1];
    },
    clearBasket: (state) => {
      state.basket = [];
      state.count = 0;
      state.price = 0;
    },
    cancelBook: (state) => {
      state.basket = [];
      state.count = 0;
      state.price = 0;
    },
    makeBook: (state, action) => {
      state.basket = [action.payload];
    },
  },
});

export const {clearBasket, clearDeletedBasket, cancelBook, makeBook} = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;