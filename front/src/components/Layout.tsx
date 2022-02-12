import { FC, ReactElement, useState } from 'react'
import SearchBox from '../components/SearchBox'
import SideNav from '../components/SideNav'
import Trends from '../components/Trends'
import { translation } from '../lib/translation'
import MobileNav from '../components/MobileNav'
import { GiFeather } from 'react-icons/gi'
import Modal from './Modal'
import Shweet from './Shweet'
import MobileSideBar from './MobileSideBar'
import cn from 'classnames'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useAuth } from './Auth'

export interface LayoutProps {
  children?: ReactElement
  header?: ReactElement
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const lang = 'ir'
  const elements = translation[lang].home
  const [modalIsOpen, setIsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div dir="rtl" className="bg-background-50 h-screen overflow-hidden dark:bg-background-900">
      <MobileSideBar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className=" md:max-w-7xl max-w-2xl mx-auto flex flex-col-reverse h-full sm:flex-row overflow-y-auto ">
        {/* SideNave */}
        <div className="lg:w-[20%] dark:text-main-50 hidden sm:block">
          <SideNav />
        </div>
        {/* MobileNav */}
        <MobileNav className="block sm:hidden" />
        <div
          onClick={openModal}
          className="lg:hidden rounded-full z-20 w-14 h-14 shadow-lg absolute flex items-center justify-center hover:bg-primary-100 bottom-[4rem] left-[1.5rem] bg-primary-500"
        >
          <GiFeather className="w-8 h-8 text-main-50" />
        </div>
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <Shweet className="w-full" />
        </Modal>

        <div className="grow relative sm:border-x dark:sm:border-background-600 flex flex-col overflow-hidden dark:text-main-50">
          <div
            onClick={() => setMobileOpen(true)}
            className={cn(
              'text-xl z-20 flex items-center gap-3  absolute top-0  w-full',
              'dark:bg-background-800 backdrop-blur-md bg-opacity-50',
              'bg-background-100 font-bold p-2 sm:p-4',
            )}
          >
            {user.profile?.avatar ? (
              <img
                src={user.profile.avatar}
                className="inline sm:hidden w-12 h-12 rounded-full"
                alt="avatar"
              />
            ) : (
              <IoPersonCircleOutline className="inline sm:hidden w-12 h-12 dark:text-main-50" />
            )}
            <div>{elements.title}</div>
          </div>
          <div className={cn('overflow-y-auto pt-14', '')}>
            {/* Main Content*/}
            {children}
          </div>
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
