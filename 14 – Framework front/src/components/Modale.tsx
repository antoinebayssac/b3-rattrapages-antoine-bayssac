import { ReactElement } from 'react'

type IProps = {
  children: ReactElement
  onChange: () => void
}

//Modale component

const Modale = ({ children, onChange }: IProps) => (
  <>
    <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded bg-pri">
      <span
        className="text-bg font-bold font-lg flex justify-end px-4 py-2 cursor-pointer"
        onClick={onChange}
      >
        X
      </span>
      {children}
    </div>
    <div
      className="absolute top-0 left-0 bg-bg w-screen h-screen z-10 opacity-50"
      onClick={onChange}
    ></div>
  </>
)

export default Modale