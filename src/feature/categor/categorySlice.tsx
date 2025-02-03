import { baseApi } from '@/store/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface ICategory {
    data?: unknown;
    _id?: string;
    title?: string;
    sulg?: string;
}
export const categorySlice = createApi({
    reducerPath: 'apicategory',
    baseQuery: baseApi,
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        // GET all products
        getCategory: builder.query<ICategory[], void>({
            query: () => 'categorys',
            providesTags: ['Category'],
        }),


        // POST new product
        addCategory: builder.mutation<ICategory, Partial<ICategory>>({
            query: (product) => ({
                url: 'categorys',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Category'],
        }),

        // PUT update product
        updateCategory: builder.mutation<ICategory, { id: string; data: Partial<ICategory> }>({
            query: ({ id, data }) => ({
                url: `categorys/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),

        // DELETE product
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `categorys/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation

} = categorySlice;




