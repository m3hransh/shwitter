import { FC, ReactElement } from 'react'
import { useAuth } from '../components/Auth'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  const { user } = useAuth()

  return (
    <div className="bg-background-600 pt-6 h-screen">
      Hello, {user.name}
    </div>
  )
}
export default Home
