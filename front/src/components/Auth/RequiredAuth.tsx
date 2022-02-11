import { FC, ReactElement, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '.'
import Loading from '../Loading'

export interface RequiredAuthProps {
  children: ReactElement
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  const { user, getCurrentUser, state } = useAuth()
  const location = useLocation()

  useEffect(() => {
    getCurrentUser()
    
  }, [])

  if (state.loading) return <Loading />
  if (state.error) return <p>`Errror: ${state.error.message}` </p>
  // make sure it waits for the first call
  if (!state.called)return <Loading />
  if (user) return children
  else return <Navigate to="/landing" state={{ from: location }} replace />
}

export default RequiredAuth
