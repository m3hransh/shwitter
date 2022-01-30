import { createContext, useContext } from 'react'

export interface AuthContextType {
  user: User
  signup: (user: Omit<User, 'id'>) => Promise<void>
  login: (user: Omit<User, 'id' | 'name'>) => Promise<void>
  logout: () => void
  signupState: any
  loginState: any
}
export interface User {
  id: number
  name: string
  email: string
}
export interface UserData {
  token: string
  user: User
}

export const AuthContext = createContext<AuthContextType>(null!)

export const useAuth = () => {
  return useContext(AuthContext)
}

export { default as AuthProvider } from './AuthProvider'
export { default as RequiredAuth } from './RequiredAuth'
