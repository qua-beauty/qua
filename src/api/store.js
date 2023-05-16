import { configureStore } from '@reduxjs/toolkit'
import {AirtableApi} from './api.js';
import {shopReducer} from './slices/shopSlice.js';
import {userReducer} from './slices/userSlice.js';
import {filterReducer} from './slices/filterSlice.js';
import {basketReducer} from './slices/basketSlice.js';

const store = configureStore({
  reducer: {
    shops: shopReducer,
    filters: filterReducer,
    basket: basketReducer,
    user: userReducer,
    [AirtableApi.reducerPath]: AirtableApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(AirtableApi.middleware)
})

export default store;