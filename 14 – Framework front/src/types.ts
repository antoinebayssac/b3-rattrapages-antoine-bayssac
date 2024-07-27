export type ProductType = {
    id: string
    name: string
    description: string
    price: number
    quantity: number
    note: string
    isAvailable: boolean
    image: string
    created_at: string
    has_to_be_consumed: string
    category_id: string
}

export type CategoryType = {
    id: string
    category: string
}

export type NoteType = {
    id: string
    product_id: string
    note: string
} 