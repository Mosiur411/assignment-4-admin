import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from '../feature/toggle/toggleSlice'
import { apiSlice } from '@/feature/product/productSlice'
import { authApi } from '@/feature/auth/authSlice'
import { categorySlice } from '@/feature/categor/categorySlice'
import { userSlice } from '@/feature/user/userSlice'

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApi.middleware,
      categorySlice.middleware,
      userSlice.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch