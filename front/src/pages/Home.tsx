import { FC, ReactElement } from 'react'
import { useAuth } from '../components/Auth'
import SearchBox from '../components/SearchBox'
import SideNav from '../components/SideNav'
import Trends from '../components/Trends'
import Tweet from '../components/Tweet'
import { translation } from '../lib/translation'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  const lang = 'ir'
  const elements = translation[lang].home

  return (
    <div dir="rtl" className="bg-background-800 h-screen">
      <div className=" max-w-6xl mx-auto flex h-full">
        <div className="lg:w-2/12 text-main-50">
          <SideNav />
        </div>
        <div className="grow border-x text-main-50">
          <div className="text-xl font-bold p-4">{elements.title}</div>
          <div className="bottom-0 h-px bg-slate-200" />
          <Tweet />
          <div className="bottom-0 h-px bg-slate-200" />
          {/* Tweets */}
          {/* <AllTweets /> */}
        </div>
        <div dir="rtl" className="w-4/12 p-5 flex flex-col gap-4">
          <SearchBox />
          <Trends />
        </div>
      </div>
    </div>
  )
}
export default Home
