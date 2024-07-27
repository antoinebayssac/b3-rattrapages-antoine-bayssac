import { useState } from "react"
import { useGetCategoriesQuery, useGetProductsQuery } from "../services/getData"
import Product from "./Product"

const ProductList = () => {
    const { data: products } = useGetProductsQuery() //Crawl products
    const { data: categories } = useGetCategoriesQuery() // Crawl categories

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


    if ( !products || products?.length === 0) return <h2>No products</h2>

    const filterProduct = () => {
        //Filter products by category
        if (!selectedCategory) return products

        return products?.filter((product) => product?.category_id === selectedCategory)
    }

    return (
        <>
            <div className="flex justify-end">
                <select 
                    className="bg-pri px-big py-mid focus:outline-none rounded-lg"
                    onChange={(event) => setSelectedCategory(event?.target?.value)}
                >
                     <option value="">All categories</option>
                    {
                        categories?.map((category, index) => (
                            <option value={category.id} key={index}>
                                {category.category}
                            </option>
                        ))
                    }
                </select>
            </div>

            <h2 className="font-bold text-xl text-pri pt-big">Product list</h2>

            <ul className="flex flex-wrap gap-big">
                {
                    filterProduct()?.map((product, index) => (
                        <li key={index} className="w-quarter">
                            <Product product={product}/>
                        </li>
                    ))
                }
            </ul>
        </>
    )

}
export default ProductList