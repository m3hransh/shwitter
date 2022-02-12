import { gql } from '@apollo/client'
import { FC, ReactElement } from 'react'
import { User } from './Auth'
import Loading from '../components/Loading'
import { FaEllipsisH } from 'react-icons/fa'
import {
  IoHeartOutline,
  IoRepeat,
  IoChatboxOutline,
  IoShareOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5'
import { useQuery } from '@apollo/client'
import { dateView } from '../lib/utils'

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

export interface Feed {
  feed: {
    count: number
    shweets: {
      id: number
      content: string
      createdAt: string
      author: User
      likedShweet: {
        user: User
      }[]
    }[]
  }
}
const AllTweets: FC<AllTweetsProps> = ({ className }) => {
  const { loading, error, data } = useQuery<Feed>(FEED_QUERY)

  return (
    <div className={className}>
      <div className="flex flex-col">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          data?.feed.shweets.map((tweet) => (
            <div key={tweet.id} className="hover:bg-accent">
              <div className="flex gap-2 p-3">
                <div className="flex-grow-0">
                  {tweet.author?.profile?.avatar ? (
                    <img
                      src={tweet.author.profile.avatar}
                      className="w-14 h-14 rounded-full"
                      alt="avatar"
                    />
                  ) : (
                    <IoPersonCircleOutline className="inline w-14 h-14 " />
                  )}
                </div>
                <div className="flex flex-col flex-grow mt-1">
                  <div className="flex gap-2 items-center">
                    <div className="font-bold mr-1">
                      {tweet.author?.profile?.name}
                    </div>
                    <div className="text-gray-500 flex gap-2 text-sm">
                      <div dir="ltr">{`@${tweet.author.username}`}</div>
                      <div>{dateView(tweet.createdAt)}</div>
                    </div>
                    <FaEllipsisH className="mr-auto text-gray-500 text-sm" />
                  </div>
                  <div>{tweet.content}</div>
                  <div className="flex justify-between text-gray-600 pt-3 mt-auto mr-10 text-xl">
                    <IoChatboxOutline />
                    <IoRepeat />
                    <IoHeartOutline />
                    <IoShareOutline />
                  </div>
                </div>
              </div>
              <div className="bottom-0 h-px dark:bg-background-600 bg-background-200" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllTweets
