import { FC, ReactElement, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '.'

export interface RequiredAuthProps {
  children: ReactElement
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  const { user, getCurrentUser, state } = useAuth()
  const location = useLocation()
  const [called, setCalled] = useState(false)

  useEffect(() => {
    console.log('UseEffect')
    getCurrentUser()
      .catch(() =>console.error)
      .finally(()=> setCalled(true))
    
  }, [])

  if (!called || state.loading) return <p>Loading...</p>
  if (state.error) return <p>`Errror: ${state.error.message}` </p>

  if (user) return children
  else return <Navigate to="/landing" state={{ from: location }} replace />
}

export default RequiredAuth
