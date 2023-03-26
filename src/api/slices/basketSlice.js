import {createSlice} from '@reduxjs/toolkit';

const calculateBasketParams = (basket) => {
  let totalCount = 0;
  let totalPrice = 0;
  basket.forEach(product => {
    if (!product.isDeleted) {
      totalCount += parseInt(product.count);
      totalPrice += parseInt(product.count) * parseInt(product.price);
    } else {
      product.count = 0; // set count of deleted product to 0
    }
  });
  return [totalCount, totalPrice];
};

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
      const existingProductIndex = newBasket.findIndex((x) => x.id === action.payload.id);

      if (existingProductIndex > -1) {
        newBasket[existingProductIndex].count++;
        delete newBasket[existingProductIndex].isDeleted;
      } else {
        const productToAdd = { ...action.payload, count: 1 };
        if (productToAdd.isDeleted) {
          delete productToAdd.isDeleted;
        }
        newBasket.push(productToAdd);
      }

      const params = calculateBasketParams(newBasket);

      state.basket = newBasket;
      state.count = params[0];
      state.price = params[1];
    },
    deleteProduct: (state, action) => {
      const newBasket = state.basket.map((p) => {
        if (p.id === action.payload.id) {
          if (p.count > 1) {
            --p.count;
          } else {
            p.isDeleted = true;
          }
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