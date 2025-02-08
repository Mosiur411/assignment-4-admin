import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseApi = fetchBaseQuery({
  baseUrl: 'https://bikeshopserver.vercel.app/api/',
  prepareHeaders: (headers) => {
    // Retrieve token from localStorage or any state management
    const token = localStorage.getItem('token'); // Adjust as needed
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  mode: 'cors',
});
