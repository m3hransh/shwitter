import { FC, ReactElement } from "react"
import { LoginForm } from "../components/Form"

export interface LoginProps {
  children?: ReactElement
  
}

const Login: FC<LoginProps> = () =>{
  return (
    <LoginForm />
  )
}
export default Login
