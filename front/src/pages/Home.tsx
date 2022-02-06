import { FC, ReactElement } from 'react'
import { useAuth } from '../components/Auth'
import SearchBox from '../components/SearchBox'
import SideNav from '../components/SideNav'
import Trends from '../components/Trends'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  const { user } = useAuth()

  return (
    <div dir="rtl" className="bg-background-700 h-screen">
      <div className=" max-w-7xl mx-auto flex h-full">
        <div className="lg:w-2/12 text-main-50">
          <SideNav />
        </div>
        <div className="grow bg-rose-400"></div>
        <div dir="rtl" className="w-4/12 p-5 flex flex-col gap-4">
          <SearchBox /> 
          <Trends /> 
        </div>
      </div>
    </div>
  )
}
export default Home
