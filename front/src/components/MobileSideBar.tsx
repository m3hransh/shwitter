import { Transition } from '@tailwindui/react'
import { FC, ReactElement } from 'react'
import {
    IoCheckmark,
  IoHomeOutline,
  IoPeopleOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import favicon from '../assets/shwitter-logo.png'
import { translation } from '../lib/translation'
import { useAuth } from './Auth'

export interface MobileSideBarProps {
  children?: ReactElement
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

const MobileSideBar: FC<MobileSideBarProps> = (props) => {
  const { mobileOpen, setMobileOpen } = props
  const lang = 'ir'
  const {user, logout} = useAuth()
  const content = translation[lang].sideNav
  return (
    <div>
      <Transition show={mobileOpen} className="absolute inset-0 z-30 bg-black bg-opacity-25 flex">

        {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div ref={ref} className="absolute inset-0">
              <div
                onClick={() => setMobileOpen(false)}
                className="absolute inset-0 opacity-75 bg-cool-gray-700"
              />
            </div>
          )}
        </Transition.Child>

        {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-full"
          leaveTo="translate-x-full"
          className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-background-100"
        >
          <div className="absolute top-0 left-0 p-1 z-30 -ml-14">
            <Transition.Child
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-cool-gray-600"
              aria-label="Close sidebar"
              as="button"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                className="w-6 h-6 text-main-50"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Transition.Child>
          </div>
            <div className="flex flex-col h-full pt-4 p-2 lg:text-lg ">
              <div className="flex flex-col space-y-4  lg:items-start">
                <Link to="/users">
                  <img
                    src={favicon}
                    alt="logo"
                    className="w-12 h-12 mx-3"
                  />
                </Link>
                <Link
                  to="/"
                  className="rounded-3xl p-2 dark:hover:bg-background-600 hover:bg-background-100"
                >
                  <h2>
                    <IoHomeOutline className="inline text-2xl mx-3" />
                    <span className="">
                      {content.home}
                    </span>
                  </h2>
                </Link>
                <Link
                  to={`/${user.username}`}
                  className="rounded-3xl p-2 hover:bg-background-100 dark:hover:bg-background-600"
                >
                  <h2>
                    <IoPersonOutline className="inline text-2xl mx-3" />
                    <span className="">{content.profile}</span>
                  </h2>
                </Link>
              <Link
                to="/users"
                className="rounded-3xl p-2 dark:hover:bg-background-600 hover:bg-background-100"
              >
                <h2>
                  <IoPeopleOutline className="inline text-2xl mx-3" />
                  <span className="">
                    {content.more}
                  </span>
                </h2>
              </Link>
              </div>
            </div>
          <div>

                <div className="flex p-4 items-center">
                  {user.profile?.avatar ? (
                    <img
                      src={user.profile.avatar}
                      className="max-h-10 rounded-full"
                      alt="avatar"
                    />
                  ) : (
                  <IoPersonCircleOutline className="inline w-14 h-14" />
                  )}
                  <h3 className="font-bold ml-2">{user?.profile?.name}</h3>
                  <IoCheckmark className="inline mr-auto text-primary-500 text-xl" />
                </div>
                <div
                  className="h-0 border border-solid border-t-0
                border-blueGray-800 "
                />
                <Link
                  to="/signup"
                  className="text-sm py-3 px-4 font-normal block w-full 
                  whitespace-nowrap hover:bg-background-500"
                >
                  {translation[lang].logout.addAccount}
                </Link>
                <button
                  className="text-sm py-3 px-4 font-normal block w-full 
                  whitespace-nowrap hover:bg-background-500"
                  onClick={logout}
                >
                  {`${translation[lang].logout.exit} @${user.username}`}
                </button>
              </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Transition>
    </div>
  )
}

export default MobileSideBar
