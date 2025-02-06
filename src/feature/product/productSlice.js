import { baseApi } from '@/store/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  reducerPath: 'apiProducts',
  baseQuery: baseApi,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // GET all products
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ['Products'],
    }),

    // GET single product
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ['Products'],
    }),

    // POST new product
    addProduct: builder.mutation({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),

    // PUT update product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // DELETE product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;




