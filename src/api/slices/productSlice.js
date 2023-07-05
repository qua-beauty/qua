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

    const shopProducts = products.data.filter((p) => {
      console.log(p.shop, shop);
      return p.shop === shop
    });

    if(!filters) {
      return shopProducts;
    }

    const filterKeys = Object.keys(filters);

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

export const selectProductsByFilters = (filters) => (
  createSelector(productSelector, (products) => {
    if(!products.data) return [];
    if(!filters) return products.data;

    const filterKeys = Object.keys(filters);

    return products.data.filter((product) => {
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