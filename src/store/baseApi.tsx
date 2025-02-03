import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const baseApi = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  mode: 'cors',
})