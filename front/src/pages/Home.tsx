import { FC, ReactElement } from 'react'
import SearchBox from '../components/SearchBox'
import SideNav from '../components/SideNav'
import Trends from '../components/Trends'
import Shweet from '../components/Shweet'
import { translation } from '../lib/translation'
import AllTweets from '../components/AllTweets'
import { IoPersonCircleOutline } from 'react-icons/io5'
import MobileNav from '../components/MobileNav'
import cn from 'classnames'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  const lang = 'ir'
  const elements = translation[lang].home

  return (
    <div dir="rtl" className="bg-background-50 dark:bg-background-900">
      <div className=" md:max-w-6xl max-w-2xl mx-auto flex flex-col-reverse sm:flex-row h-screen overflow-hidden">
        <div className="lg:w-2/12 dark:text-main-50 hidden sm:block">
          <SideNav />
        </div>
        <MobileNav className="block sm:hidden" />
        <div className="grow relative sm:border-x dark:sm:border-background-600 flex flex-col overflow-hidden dark:text-main-50">
          <div
            className={cn(
              'text-xl flex items-center gap-3 sticky top-0  w-full',
              'dark:bg-background-800 backdrop-blur-lg bg-opacity-75',
              'bg-background-100 font-bold p-2 sm:p-4',
            )}
          >
            <IoPersonCircleOutline className="inline sm:hidden w-12 h-12 " />
            {elements.title}
          </div>
          <div className={cn("overflow-y-auto",
            "sm:scrollbar-thin scrollbar-thumb-background-600 scrollbar-track-background-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          )}>
            <Shweet className="hidden sm:block" />
            <div className="bottom-0 h-px bg-background-200 dark:bg-background-600" />
            {/* Tweets */}
            <AllTweets className="mt-5" />
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
export default Home
