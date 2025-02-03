import { baseApi } from '@/store/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface IUser {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    isBlocked?: boolean;
}

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
        updateUser: builder.mutation<IUser, { id: string; data: Partial<IUser> }>({
            query: ({ id, data }) => ({
                url: `user/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        // DELETE User
        deleteUser: builder.mutation<void, string>({
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




