import { gql } from '@apollo/client'
import { FC, ReactElement } from 'react'
import { User } from './Auth'
import {
  differenceInDays,
  differenceInYears,
  format,
  formatDistanceToNowStrict,
} from 'date-fns'
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
          id
          name
        }
        likedShweet {
          user {
            id
            name
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
const dateView = (date: string) => {
  let currentDate = new Date(date)
  if (differenceInDays(new Date(), currentDate) < 1)
    return formatDistanceToNowStrict(currentDate)
  else if (differenceInYears(new Date(), currentDate) < 1)
    return format(currentDate, 'LLL d')
  else return format(currentDate, 'LLL d, y')
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
                  {/* {tweet.author.profile && tweet.author.profile.avatar ? ( */}
                  {/*   <img */}
                  {/*     src={tweet.author.profile.avatar} */}
                  {/*     className="w-14 rounded-full" */}
                  {/*     alt="avatar" */}
                  {/*   /> */}
                  {/* ) : ( */}
                  <IoPersonCircleOutline className="inline w-14 h-14 " />
                  {/* )} */}
                </div>
                <div className="flex flex-col flex-grow mt-1">
                  <div className="flex gap-2 items-center">
                    <div className="font-bold mr-1">
                      {tweet.author.name}
                    </div>
                    <div className="text-gray-500 flex gap-2 text-sm">
                      <div dir="ltr">
                        {`@${tweet.author.name} ${tweet.author.id}`}
                      </div>
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
              <div className="bottom-0 h-px bg-background-600" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllTweets
