import {createSelector, createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    current: null
  },
  reducers: {
    setProductsData: (state, action) => {
      state.data = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.current = action.payload;
    }
  }
});

const productSelector = (state) => state.products;

export const selectProductsByShop = (shop, filters) => (
  createSelector(productSelector, (products) => {
    if(!products.data) return [];

    const filterKeys = Object.keys(filters);
    const shopProducts = products.data.filter((p) => p.shop === shop);

    if(!filters) {
      return shopProducts;
    }

    return shopProducts.filter((product) => {
      return filterKeys.every((eachKey) => {
        if (!filters[eachKey].length) {
          return true;
        }

        return product[eachKey] === filters[eachKey];
      });
    });
  })
)

export const {setProductsData, setCurrentProduct} = productSlice.actions;
export const productReducer = productSlice.reducer;