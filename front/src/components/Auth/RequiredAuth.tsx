import { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '.'

export interface RequiredAuthProps {
  children: ReactElement
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    // Redirect them to the login page, but save the current location

    return <Navigate to="/landing" state={{ from: location }} replace />
  }

  return children
}

export default RequiredAuth
