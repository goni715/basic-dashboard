import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import authSliceReducer from '../features/auth/authSlice'
import doctorSliceReducer from '../features/doctor/doctorSlice'
import faqSliceReducer from '../features/faq/faqSlice'
import contentSliceReducer from '../features/content/contentSlice'
import hospitalSliceReducer from '../features/hospital/hospitalSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        doctor: doctorSliceReducer,
        hospital: hospitalSliceReducer,
        faq: faqSliceReducer,
        content: contentSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch