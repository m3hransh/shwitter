import { FC, ReactElement } from 'react'
import { FaUser, FaSearch, FaComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ShwitterLogo from '../assets/silent-crow.png'
import {translation} from '../lib/translation'

export interface LandingProps {
  children?: ReactElement
}

const Landing: FC<LandingProps> = () => {
  const lang = 'ir'
  return (
    <div>
      <div dir="rtl" className="flex flex-col-reverse h-screen">
        <div className="flex bg-background-800 flex-col-reverse gap-4 sm:items-stretch sm:flex-row h-full">
          {/* left */}
          <div className="sm:w-1/2 flex sm:text-2xl flex-grow text-lg flex-col items-center justify-center bg-primary text-white">
            {/* items-wraper */}
            <div className=" flex flex-col space-y-5 w-3/5">
              <div>
                <FaSearch className="inline ml-3" />
                <span>{translation[lang].landing.mottos.first}</span>
              </div>
              <div>
                <FaUser className="inline ml-3" />
                <span>{translation[lang].landing.mottos.second}</span>
              </div>
              <div>
                <FaComment className="inline ml-3" />
                <span>{translation[lang].landing.mottos.third}</span>
              </div>
            </div>
          </div>
          {/* center */}
          <div className="sm:w-1/2 bg-background-100 flex flex-col flex-none items-center justify-center">
            <div className="w-3/5">
              <img src={ShwitterLogo} alt="logo" className="w-40" />
              <h1 className="text-3xl font-bold my-4">{translation[lang].landing.main.first}</h1>
              <span className="text-xl font-bold">
                {' '}
                {translation[lang].landing.main.second}
              </span>
              <div className="flex flex-col mt-3 space-y-4">
                <Link
                  className="text-center bg-primary-500 rounded-3xl p-2  text-white font-bold hover:bg-secondary"
                  to="/signup"
                >
                  {translation[lang].form.signup}
                </Link>

                <Link
                  className="text-center rounded-3xl p-2 text-primary-500 border-primary-500 border font-bold hover:bg-accent "
                  to="/login"
                >
                  {translation[lang].form.login}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Landing
