import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCreateNoteMutation, useDeleteProductMutation, useGetNotesQuery, useUpdateQuantityProductMutation } from "../services/getData"
import { ProductType } from "../types"
import Button from "./Button"
import Modale from "./Modale"


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

const ManageProduct = (props: IProps) => {
    const { product } = props  
    const [deleteProductMutation] = useDeleteProductMutation()
    const [updateQuantityProduct] = useUpdateQuantityProductMutation()

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        //Updtae a product
        updateQuantityProduct({ body: data, id: product.id })
    }

    const deleteProduct = async (id: string) => {
        //Delete a product
        deleteProductMutation({id})
    }
    

    return(
        <>
            <div className="p-big flex flex-col gap-big">
                <h3 className="text-bg font-bold text-xl">Manage your product</h3>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            defaultValue={product.quantity} 
                            {...register("quantity")} 
                            type="number"
                            className="border-b border-bg bg-transparent focus:outline-none"
                        />
                        <input type="submit" className="cursor-pointer" />
                    </form>
                </div>

                <div className="self-end">
                    <Button text="Delete" onChange={() => deleteProduct(product.id)}/>
                </div>
            </div>
        </>
    )
}

const AddNoteToProduct = (props: IProps) => {
    const { product } = props  
    const [createNote] = useCreateNoteMutation()
    const {data: notes} = useGetNotesQuery()

    const {
        register,
        handleSubmit,
    } = useForm<InputsModaleNote>()

    const onSubmit: SubmitHandler<InputsModaleNote> = (data) => {
        //Create a note
        const body = {
            note: data.note,
            product_id: product.id
        }
        createNote({body})
    }

    return(
        <>
            <div className="p-big flex flex-col gap-big">
                <h3 className="text-bg font-bold text-xl">Add note</h3>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            placeholder="Add note"
                            {...register("note")} 
                            type="text"
                            className="border-b border-bg bg-transparent focus:outline-none"
                        />
                        <input type="submit" className="cursor-pointer" />
                    </form>
                </div>

                <ul className="flex flex-col gap-mid">
                    {
                        notes?.filter((note) => note?.product_id === product?.id)?.map((note, index) => (
                            <li key={index} className="border border-bg rounded-lg px-mid py-small">
                                <p className="text-bg text-sm">{note.note}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
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
                <Button text="Manage" onChange={() => setModale(!modale)}/>
                <Button text="Note" onChange={() => setModaleNote(!modaleNote)}/>
            </div>
            {
                modale && <Modale onChange={() => setModale(!modale)} children={<ManageProduct product={product} />}/>
            }
            {
                modaleNote && <Modale onChange={() => setModaleNote(!modaleNote)} children={<AddNoteToProduct product={product} />}/>
            }
        </>
    )

}
export default Product