import { createContext, useContext } from 'react'
import { AuthContextType } from '../../types'


export const AuthContext = createContext<AuthContextType>(null!)

export const useAuth = () => {
  return useContext(AuthContext)
}

export { default as AuthProvider } from './AuthProvider'
export { default as RequiredAuth } from './RequiredAuth'
