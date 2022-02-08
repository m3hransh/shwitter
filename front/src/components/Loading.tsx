import { FC, ReactElement } from 'react'
import { ClipLoader } from 'react-spinners'


export interface LoadingProps{
  children?: ReactElement
  
}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center align-middle">
      <ClipLoader color="#1E9BF0" size={100} />
    </div>
  )
}

export default Loading
