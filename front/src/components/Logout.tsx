import React, { FC, useState } from 'react'
import {
  IoPersonCircleOutline,
  IoEllipsisHorizontalOutline,
  IoCheckmark,
} from 'react-icons/io5'
import { useAuth } from './Auth'
import { Transition } from '@tailwindui/react'
import { translation } from '../lib/translation'

interface LogoutProps {
  className?: string
  chidlren?: React.ReactNode
}

const Logout: FC<LogoutProps> = ({ className }) => {
  const { user, logout } = useAuth()
  const [tooltip, setTooltip] = useState(false)
  //TODO: use context for the language
  const lang = 'ir'

  return (
    <>
      <div className={className}>
        <div className="flex flex-col items-center  w-full">
          <Transition
            show={tooltip}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              role="tooltip"
              className="relative z-20 flex flex-col mb-2 bg-background-600 transition-all duration-700 ease-in-out  shadow-lg rounded-2xl"
            >
              <svg
                className="mb-[-10px] absolute fill-background-600 bottom-0 left-0  w-full"
                width="16px"
                height="16px"
                viewBox="0 0 9 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth={1}
                  fillRule="evenodd"
                >
                  <g
                    id="Tooltips-"
                    transform="translate(-874.000000, -1029.000000)"
                  >
                    <g
                      id="Group-3-Copy-16"
                      transform="translate(850.000000, 975.000000)"
                    >
                      <g
                        id="Group-2"
                        transform="translate(24.000000, 0.000000)"
                      >
                        <polygon
                          id="Triangle"
                          transform="translate(4.500000, 62.000000) rotate(-180.000000) translate(-4.500000, -62.000000) "
                          points="4.5 57.5 12.5 66.5 -3.5 66.5"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <div className="mb-4 text-main-50">
                <div className="flex p-4 items-center">
                  {/* {data?.me.profile && data?.me.profile.avatar ? ( */}
                  {/*   <img */}
                  {/*     src={data.me.profile.avatar} */}
                  {/*     className="max-h-10 rounded-full" */}
                  {/*     alt="avatar" */}
                  {/*   /> */}
                  {/* ) : ( */}
                  <IoPersonCircleOutline className="inline w-14 h-14" />
                  {/* )} */}
                  <h3 className="font-bold ml-2">{user?.profile?.name}</h3>
                  <IoCheckmark className="inline mr-auto text-primary-500 text-xl" />
                </div>
                <div
                  className="h-0 border border-solid border-t-0
                border-blueGray-800 "
                />
                <a
                  href="#pablo"
                  className="text-sm py-3 px-4 font-normal block w-full 
                  whitespace-nowrap hover:bg-background-500"
                  onClick={(e) => e.preventDefault()}
                >
                  {translation[lang].logout.addAccount}
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-3 px-4 font-normal block w-full 
                  whitespace-nowrap hover:bg-background-500"
                  onClick={logout}
                >
                  {`${translation[lang].logout.exit} @${user.username}`}
                </a>
              </div>
            </div>
          </Transition>
          <button
            className="flex flex-row dark:hover:bg-background-700 hover:bg-background-100 rounded-full p-2 items-center w-full justify-start"
            onClick={() => setTooltip(!tooltip)}
          >
            {/* {data?.me.profile && data?.me.profile.avatar ? ( */}
            {/*   <img */}
            {/*     src={data.me.profile.avatar} */}
            {/*     className="max-h-10 rounded-full" */}
            {/*     alt="avatar" */}
            {/*   /> */}
            {/* ) : ( */}
            <div>
              <IoPersonCircleOutline className="inline w-14 h-14" />
              {/* )} */}
              <h3 className="font-bold hidden lg:inline">{user.profile?.name && user.profile.name.length > 10 ? `${user.profile?.name}...`: user.profile?.name}</h3>
            </div>
            <div className="mr-auto">
              <IoEllipsisHorizontalOutline className="hidden text-2xl lg:inline" />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default Logout
