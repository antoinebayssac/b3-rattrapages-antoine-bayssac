import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryType, NoteType, ProductType } from '../types'

type DeleteProduct = {
    id: string;
}

type PatchProduct = {
    id: string;
    body: {
        quantity: number
    }
}

export type CreateProduct = {
    body: {
        name: string
        description: string
        note: string
        price: number
        quantity: number
        image: string
        created_at: string
        has_to_be_consumed: string
        isAvailable: boolean
        category_id: string
    }
}

export type CreateNote = {
    body: {
        note: string
        product_id: string
    }
}

// Crawler for api
export const getDataFromApi = createApi({
    reducerPath: 'getDataFromApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['products', 'notes'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductType[], void>({
            query: () => `products`,
            providesTags: ['products'],
        }),
        getCategories: builder.query<CategoryType[], void>({
            query: () => `categories`,
        }),
        getNotes: builder.query<NoteType[], void>({
            query: () => `notes`,
            providesTags: ['notes'],
        }),
        deleteProduct: builder.mutation<string, DeleteProduct>({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['products'],
        }),
        updateQuantityProduct: builder.mutation<string, PatchProduct>({
            query: ({ id, body }) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['products'],
        }),
        createProduct: builder.mutation<string, CreateProduct>({
            query: ({ body }) => ({
                url: `products`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['products'],
        }),
        createNote: builder.mutation<string, CreateNote>({
            query: ({ body }) => ({
                url: `notes`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['products', 'notes'],
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useDeleteProductMutation,
    useUpdateQuantityProductMutation,
    useCreateProductMutation,
    useCreateNoteMutation,
    useGetNotesQuery
} = getDataFromApi
