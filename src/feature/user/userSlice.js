import { baseApi } from '@/store/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';



export const userSlice = createApi({
    reducerPath: 'apiUser',
    baseQuery: baseApi,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        // GET single User
        getUser: builder.query({
            query: () => `user`,
            providesTags: ['User'],
        }),
        // PUT update User
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `user/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        // DELETE User
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation

} = userSlice;




