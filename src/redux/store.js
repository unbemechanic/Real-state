import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
  middleware:{
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
  }
})