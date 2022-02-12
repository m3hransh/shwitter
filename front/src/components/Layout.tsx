import { FC, ReactElement, useState } from 'react'
import SearchBox from '../components/SearchBox'
import SideNav from '../components/SideNav'
import Trends from '../components/Trends'
import { translation } from '../lib/translation'
import MobileNav from '../components/MobileNav'
import { GiFeather } from 'react-icons/gi'
import Modal from './Modal'
import Shweet from './Shweet'

export interface LayoutProps {
  children?: ReactElement
  header?: ReactElement
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const lang = 'ir'
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div dir="rtl" className="bg-background-50 dark:bg-background-900">
      <div className=" md:max-w-7xl max-w-2xl mx-auto flex flex-col-reverse sm:flex-row h-screen overflow-hidden">
        {/* SideNave */}
        <div className="lg:w-[20%] dark:text-main-50 hidden sm:block">
          <SideNav />
        </div>
        {/* MobileNav */}
        <MobileNav className="block sm:hidden" />
        <div 
          onClick={openModal}
          className="lg:hidden rounded-full z-20 w-14 h-14 shadow-lg absolute flex items-center justify-center hover:bg-primary-100 bottom-[4rem] left-[1.5rem] bg-primary-500">
          <GiFeather
            className="w-8 h-8 text-main-50" />
        </div>
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <Shweet className="w-full" />
        </Modal>

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
