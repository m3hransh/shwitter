import { FC, ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  return (
    <div className="bg-background-800 h-screen">
    <Outlet />
  </div>
  )
}
export default Home
