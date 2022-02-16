import { gql } from '@apollo/client'
import { FC, ReactElement } from 'react'
import Loading from '../components/Loading'
import { useQuery } from '@apollo/client'
import { Feed } from '../types'
import  ShweetList from './ShweetList'

export interface AllTweetsProps {
  children?: ReactElement
  className?: string
}

export const FEED_QUERY = gql`
  query Feed {
    feed(orderBy: { createdAt: desc }) {
      count
      shweets {
        id
        content
        createdAt
        author {
          username
          profile {
            name
            avatar
          }
        }
        likedShweet {
          user {
            username
          }
        }
      }
    }
  }
`

const AllTweets: FC<AllTweetsProps> = ({ className }) => {
  const { loading, error, data } = useQuery<Feed>(FEED_QUERY)

  return (
    <div className={className}>
      <div className="flex flex-col">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error.message}</p>
        ) : <ShweetList shweets={data?.feed?.shweets} />
          
        }
      </div>
    </div>
  )
}

export default AllTweets
