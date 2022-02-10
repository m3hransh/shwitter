import { FC, ReactElement } from 'react'
import SearchBox from '../components/SearchBox'
import SideNav from '../components/SideNav'
import Trends from '../components/Trends'
import { translation } from '../lib/translation'
import MobileNav from '../components/MobileNav'

export interface LayoutProps {
  children?: ReactElement
  header?: ReactElement
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const lang = 'ir'
  return (
    <div dir="rtl" className="bg-background-50 dark:bg-background-900">
      <div className=" md:max-w-6xl max-w-2xl mx-auto flex flex-col-reverse sm:flex-row h-screen overflow-hidden">
        {/* SideNave */}
        <div className="lg:w-2/12 dark:text-main-50 hidden sm:block">
          <SideNav />
        </div>
        {/* MobileNav */}
        <MobileNav className="block sm:hidden" />

        <div className="grow relative sm:border-x dark:sm:border-background-600 flex flex-col overflow-hidden dark:text-main-50">
          {/* Main Content*/}
          {children}
        </div>
        <div
          dir="rtl"
          className="w-4/12 p-5 hidden md:flex flex-col gap-4"
        >
          <SearchBox />
          <Trends />
        </div>
      </div>
    </div>
  )
}

export default Layout
