import {createApi} from '@reduxjs/toolkit/query/react';
import {airtableBaseQuery} from './airtableBaseQuery.js';
import {categoryMapper, orderMapper, productMapper, shopMapper, userMapper, reviewMapper} from '../../shared/mappers.js';
import {serializeOrder, serializeUser, serializeShop} from '../../shared/serializers.js';

export const AirtableApi = createApi({
  reducerPath: 'AirtableApi',
  baseQuery: airtableBaseQuery,
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => ({
        tableName: 'Masters',
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
    getReviews: builder.query({
      query: () => ({
        tableName: 'Reviews',
        method: 'select'
      }),
      transformResponse(result, meta, arg) {
        return result.map((item) => reviewMapper(item));
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
    addLike: builder.mutation({
      query: (shop) => ({
        tableName: 'Masters',
        method: 'update',
        data: serializeShop(shop)
      }),
      transformResponse(result, meta, arg) {
        return result.length > 0 ? shopMapper(result[0]) : null;
      }
    }),
    deleteLike: builder.mutation({
      query: (shop) => ({
        tableName: 'Masters',
        method: 'update',
        data: serializeShop(shop)
      }),
      transformResponse(result, meta, arg) {
        return result.length > 0 ? shopMapper(result[0]) : null;
      }
    }),
    saveOrder: builder.mutation({
      query: (order) => ({
        tableName: 'Orders',
        method: 'create',
        data: serializeOrder(order)
      }),
      transformResponse(result, meta, arg) {
        return result.length > 0 ? orderMapper(result[0]) : null;
      }
    }),
    saveUser: builder.mutation({
      query: (user) => ({
        tableName: 'Users',
        method: 'create',
        data: serializeUser(user)
      }),
      transformResponse(result, meta, arg) {
        return result.length > 0 ? userMapper(result[0]) : null;
      }
    }),
    getUser: builder.mutation({
      query: (user) => ({
        tableName: 'Users',
        method: 'retrieve',
        data: {
          key: 'TelegramId',
          value: user.id
        }
      }),
      transformResponse(result, meta, arg) {
        return result.length > 0 ? userMapper(result[0]) : null;
      }
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetProductsQuery,
  useGetReviewsQuery,
  useGetCategoriesQuery,
  useGetUserMutation,
  useSaveOrderMutation,
  useSaveUserMutation,
  useAddLikeMutation,
  useDeleteLikeMutation,
} = AirtableApi;