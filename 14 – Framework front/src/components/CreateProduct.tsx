import { SubmitHandler, useForm } from "react-hook-form"
import { useCreateProductMutation, useGetCategoriesQuery } from "../services/getData"


type Inputs = {
    name: string
    description: string
    price: number
    quantity: number
    note: string
    isAvailable: boolean
    image: string
    has_to_be_consumed: string
    category_id: string
}

const CreateProduct = () => {
    const inputStyle = 'bg-transparent border border-pri px-big py-mid rounded-lg focus:text-pri focus:outline-none text-pri'
    const inputWidthStyle = 'w-half'

    const { data: categories } = useGetCategoriesQuery()
    const [createProduct] = useCreateProductMutation()

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        //Create a product
        const date = new Date() //Set date of today
        date.setMonth(date.getMonth() + 3)
        const has_to_be_consumed = new Date(date).toJSON().slice(0, 10)

        const body = {
            name: data.name,
            description: data.description,
            note: data?.note,
            price: data?.price,
            quantity: data?.quantity,
            isAvailable: !!data?.quantity,
            image: data?.image,
            created_at: new Date().toJSON().slice(0, 10),
            has_to_be_consumed,
            category_id: data?.category_id
        }

        createProduct({ body })
    }


    return (
        <>
            <h2 className="font-bold text-xl text-pri pt-big">Create Product</h2>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-big w-full pt-big"
            >
                <select 
                    className="bg-pri px-big py-mid focus:outline-none rounded-lg w-full"
                    {...register("category_id")}
                >
                     <option value="">Choose category</option>
                    {
                        categories?.map((category, index) => (
                            <option value={category.id} key={index}>
                                {category.category}
                            </option>
                        ))
                    }
                </select>
                <input 
                    placeholder="Insert name"
                    {...register("name")} 
                    type="text"
                    className={`${inputStyle} ${inputWidthStyle}`}
                />
                <input 
                    placeholder="Insert description"
                    {...register("description")} 
                    type="text"
                    className={`${inputStyle} ${inputWidthStyle}`}
                />
               <input 
                    placeholder="Insert quantity"
                    {...register("quantity")} 
                    type="number"
                    className={`${inputStyle} ${inputWidthStyle}`}
                />
               <input 
                    placeholder="Insert price"
                    {...register("price")} 
                    type="number"
                    className={`${inputStyle} ${inputWidthStyle}`}
                />
               <input 
                    placeholder="Insert note"
                    {...register("note")} 
                    type="text"
                    className={`${inputStyle} ${inputWidthStyle}`}
                />
                <input 
                    placeholder="Insert image"
                    {...register("image")} 
                    type="text"
                    className={`${inputStyle} ${inputWidthStyle}`}
                />

                <input type="submit"   className={`${inputStyle} cursor-pointer hover:bg-pri hover:text-bg transition w-full`}/>
            </form>
        </>
    )

}

export default CreateProduct