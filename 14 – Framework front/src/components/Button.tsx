
type IProps = {
    text: string
    onChange: () => void
}

const Button = (props: IProps) => {

    const { text, onChange }= props

    return (
        <>
            <button 
                className="font-bold border border-bg py-mid px-big text-pri bg-bg hover:bg-pri hover:text-bg transition rounded-lg"
                onClick={onChange}
            >
                {text}
            </button>
        </>
    )
}

export default Button