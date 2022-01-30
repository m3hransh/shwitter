import { FC, ReactElement } from 'react'
import { SignupForm } from '../components/Form'

export interface SignupProps {
  children?: ReactElement
}

const Signup: FC<SignupProps> = () => {
  return (
      <SignupForm />
       
  )
}
export default Signup
