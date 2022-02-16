import { FC, ReactElement } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import {
  IoHeartOutline,
  IoRepeat,
  IoChatboxOutline,
  IoShareOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { dateView } from '../lib/utils'
import { Shweet } from '../types'

export interface ShweetListProps {
  children?: ReactElement
  shweets?: Shweet[]
}

const ShweetList: FC<ShweetListProps> = ({ shweets }) => {
  return (
    <>
      {shweets &&
        shweets.map((item) => (
          <div key={item.id} className="hover:bg-background-100">
            <div className="flex gap-2 p-3">
              <div className="flex-grow-0">
                  <Link
                    to={`/${item.author.username}`}>

                {item.author?.profile?.avatar ? (
                  <img
                    src={item.author.profile.avatar}
                    className="w-14 h-14 rounded-full"
                    alt="avatar"
                  />
                ) : (
                  <IoPersonCircleOutline className="inline w-14 h-14 " />
                )}
                </Link>
              </div>
              <div className="flex flex-col flex-grow mt-1">
                <div className="flex gap-2 items-center">
                  <Link
                    to={`/${item.author.username}`}
                    className="font-bold mr-1"
                  >
                    {item.author?.profile?.name}
                  </Link>
                  <div className="text-gray-500 flex gap-2 text-sm">
                    <Link to={`/${item.author.username}`}>
                      <div dir="ltr">{`@${item.author.username}`}</div>
                    </Link>
                    <div>{dateView(item.createdAt)}</div>
                  </div>
                  <FaEllipsisH className="mr-auto text-gray-500 text-sm" />
                </div>
                <div>{item.content}</div>
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
        ))}
    </>
  )
}

export default ShweetList
