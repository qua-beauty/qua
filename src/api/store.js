import { configureStore } from '@reduxjs/toolkit'
import {AirtableApi} from './api.js';
import {shopReducer} from './slices/shopSlice.js';
import {productReducer} from './slices/productSlice.js';
import {reviewReducer} from './slices/reviewSlice.js';
import {categoryReducer} from './slices/categorySlice.js';
import {userReducer} from './slices/userSlice.js';
import {filterReducer} from './slices/filterSlice.js';
import {bookingReducer} from './slices/bookingSlice.js';

const store = configureStore({
  reducer: {
    shops: shopReducer,
    products: productReducer,
    reviews: reviewReducer,
    categories: categoryReducer,
    filters: filterReducer,
    booking: bookingReducer,
    user: userReducer,
    [AirtableApi.reducerPath]: AirtableApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(AirtableApi.middleware)
})

export default store;