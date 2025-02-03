import { baseApi } from '@/store/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface IProduct {
  data: unknown;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  publicationDate: string;
  image?: string;
}

export const apiSlice = createApi({
  reducerPath: 'apiProducts',
  baseQuery: baseApi,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // GET all products
    getProducts: builder.query<IProduct[], void>({
      query: () => 'products',
      providesTags: ['Products'],
    }),

    // GET single product
    getProduct: builder.query<IProduct, string>({
      query: (id) => `products/${id}`,
      providesTags: ['Products'],
    }),

    // POST new product
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),

    // PUT update product
    updateProduct: builder.mutation<IProduct, { id: string; data: Partial<IProduct> }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    // DELETE product
    deleteProduct: builder.mutation<void, string>({
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




