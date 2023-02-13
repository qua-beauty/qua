import {createSlice} from '@reduxjs/toolkit';

const calculateBasketParams = (basket) => {
  return basket.reduce(
    (acc, product) => {
      return [
        acc[0] + parseInt(product.count),
        acc[1] + parseInt(product.count) * parseInt(product.price)
      ];
    },
    [0, 0]
  );
}

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    order: null,
    basket: [],
    count: 0,
    price: 0,
    currency: 'LKR',
  },
  reducers: {
    clearBasket: (state) => {
      state.basket = [];
      state.count = 0;
      state.price = 0;
    },
    addProduct: (state, action) => {
      const newBasket = [...state.basket];
      const isProductExist = newBasket.filter((x) => x.id === action.payload.id)[0];

      if (isProductExist) {
        ++isProductExist.count;
      } else {
        newBasket.push({
          ...action.payload,
          count: 1,
        });
      }

      const params = calculateBasketParams(newBasket);

      state.basket = newBasket;
      state.count = params[0];
      state.price = params[1];
    },
    deleteProduct: (state, action) => {
      const newBasket = state.basket.filter((p) => {
        if (p.id === action.payload.id) {
          if (p.count <= 1) return false;
          --p.count;
        }

        return p;
      });

      const params = calculateBasketParams(newBasket);

      state.basket = newBasket;
      state.count = params[0];
      state.price = params[1];
    },
  },
});

export const {addProduct, deleteProduct, clearBasket} = basketSlice.actions;

export const basketReducer = basketSlice.reducer;