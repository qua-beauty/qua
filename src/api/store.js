import { configureStore } from '@reduxjs/toolkit'
import {AirtableApi} from './api.js';
import {shopReducer} from './slices/shopSlice.js';
import {productReducer} from './slices/productSlice.js';
import {categoryReducer} from './slices/categorySlice.js';
import filterSlice from './slices/filterSlice.js';
import basketSlice from './slices/basketSlice.js';

export default configureStore({
  reducer: {
    shops: shopReducer,
    products: productReducer,
    categories: categoryReducer,
    filters: filterSlice,
    basket: basketSlice,
    [AirtableApi.reducerPath]: AirtableApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(AirtableApi.middleware)
})