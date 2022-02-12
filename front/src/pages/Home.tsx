import { FC, ReactElement } from 'react'
import Layout from '../components/Layout'
import Shweet from '../components/Shweet'
import AllTweets from '../components/AllTweets'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  return (
    <Layout>
      <>
          <Shweet className="hidden sm:block" />
          <div className="bottom-0 h-px bg-background-200 dark:bg-background-600" />
          {/* Tweets */}
          <AllTweets />
      </>
    </Layout>
  )
}
export default Home
