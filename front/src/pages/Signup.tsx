import { FC, ReactElement } from 'react'
import SignupForm from '../components/form/SignupForm'

export interface SignupProps {
  children?: ReactElement
}

const Signup: FC<SignupProps> = () => {
  return (
      <SignupForm />
       
  )
}
export default Signup
