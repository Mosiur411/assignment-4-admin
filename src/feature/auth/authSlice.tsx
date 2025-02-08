import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://bikeshopserver.vercel.app/api/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    //   async onQueryStarted(_, { queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       localStorage.setItem('token', data.token);
    //     } catch (error) {
    //       console.error('Login failed:', error);
    //     }
    //   },
    }),

    logoutUser: builder.mutation({
      queryFn: async () => {
        localStorage.removeItem('token');
        return { data: null };
      },
    }),

    getCurrentUser: builder.query({
      query: () => 'auth/me',
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetCurrentUserQuery,
} = authApi;
