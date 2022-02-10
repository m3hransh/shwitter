import { FC, ReactElement } from 'react'
import Layout from '../components/Layout'
import Shweet from '../components/Shweet'
import AllTweets from '../components/AllTweets'
import { IoPersonCircleOutline } from 'react-icons/io5'
import cn from 'classnames'
import { translation } from '../lib/translation'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  const lang = 'ir'
  const elements = translation[lang].home
  return (
    <Layout>
      <>
        <div
          className={cn(
            'text-xl flex items-center gap-3  absolute top-0  w-full',
            'dark:bg-background-800 backdrop-blur-md bg-opacity-50',
            'bg-background-100 font-bold p-2 sm:p-4',
          )}
        >
          <IoPersonCircleOutline className="inline sm:hidden w-12 h-12 " />
          <div>{elements.title}</div>
        </div>
        <div className={cn('overflow-y-auto pt-14', '')}>
          <Shweet className="hidden sm:block" />
          <div className="bottom-0 h-px bg-background-200 dark:bg-background-600" />
          {/* Tweets */}
          <AllTweets />
        </div>
      </>
    </Layout>
  )
}
export default Home
