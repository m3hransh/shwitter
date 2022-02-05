import { FC, ReactElement } from 'react'
import { useAuth } from '../components/Auth'
import SideNav from '../components/SideNav'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  const { user } = useAuth()

  return (
    <div dir="rtl" className="bg-background-600 h-screen">
      <div className=" max-w-7xl mx-auto flex bg-blue-500 h-full">
        <div className="w-2/12 bg-slate-300">
          <SideNav />
        </div>
        <div className="grow bg-rose-400"></div>
        <div className="w-4/12 bg-rose-300"></div>
      </div>
    </div>
  )
}
export default Home
