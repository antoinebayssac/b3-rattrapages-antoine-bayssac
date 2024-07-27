import { useState } from "react"
import { ProductType } from "../types"


type IProps = {
    product: ProductType
}

type Inputs = {
    quantity: number
}

type InputsModaleNote = {
    note: string
    product_id: string
}


const Product = (props: IProps) => {
    const { product } = props  
    const [modale, setModale] = useState<boolean>(false)
    const [modaleNote, setModaleNote] = useState<boolean>(false)

    if (!product.isAvailable || product.quantity <= 0) return null

    return (
        <>
            <div 
                className="bg-pri p-big rounded-lg w-full flex flex-col gap-1 hover:scale-105 transition cursor-pointer"
            >
                <div className="flex flex-row justify-between">
                    <h4 className="font-bold uppercase">{product.name}</h4>
                    <h4 className="text-sm font-bold">{product.price}$</h4>
                </div>
                <img 
                    src={product.image} 
                    className="w-1/4 self-center"
                />
                <p className="text-sm">{product.description}</p>
                <h4 className="text-sm self-end">{product.has_to_be_consumed}</h4>
            </div>
        </>
    )

}
export default Product