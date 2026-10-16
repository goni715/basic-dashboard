import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import authSliceReducer from '../features/auth/authSlice'
import ownerSliceReducer from '../features/owner/ownerSlice'
import faqSliceReducer from '../features/faq/faqSlice'
import contentSliceReducer from '../features/content/contentSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        owner: ownerSliceReducer,
        faq: faqSliceReducer,
        content: contentSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch