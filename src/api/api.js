import {createApi} from '@reduxjs/toolkit/query/react';
import {airtableBaseQuery} from './airtable.js';
import {categoryMapper, productMapper, shopMapper} from './mappers.js';
import {serializeOrder} from './serializers.js';

export const AirtableApi = createApi({
  reducerPath: 'AirtableApi',
  baseQuery: airtableBaseQuery,
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => ({
        tableName: 'Shops',
        method: 'select'
      }),
      transformResponse(result, meta, arg) {
        return result.map((item) => shopMapper(item));
      }
    }),
    getProducts: builder.query({
      query: () => ({
        tableName: 'Products',
        method: 'select'
      }),
      transformResponse(result, meta, arg) {
        return result.map((item) => productMapper(item));
      }
    }),
    getCategories: builder.query({
      query: () => ({
        tableName: 'Categories',
        method: 'select'
      }),
      transformResponse(result, meta, arg) {
        return result.map((item) => categoryMapper(item));
      }
    }),
    saveOrder: builder.mutation({
      query: (order) => ({
        tableName: 'Orders',
        method: 'create',
        data: serializeOrder(order)
      }),
    }),
  }),
});

export const {useGetShopsQuery, useGetProductsQuery, useGetCategoriesQuery, useSaveOrderMutation} = AirtableApi;