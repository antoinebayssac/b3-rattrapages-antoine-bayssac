import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {getDataFromApi} from './services/getData'

export const store = configureStore({
    reducer: {
        [getDataFromApi.reducerPath]: getDataFromApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(getDataFromApi.middleware),
})

setupListeners(store.dispatch)
