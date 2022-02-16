import { FC, ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { dateView } from '../lib/utils'
import Loading from '../components/Loading'
import { Users } from '../types'
import { Link } from 'react-router-dom'

export interface UsersPageProps {
  children?: ReactElement
}

export const USERS_QUERY = gql`
  query Users {
    allUsers {
      users {
        id
        username
        email
        profile {
          name
          avatar
          createdAt
        }
      }
      count
    }
  }
`
const UsersPage: FC<UsersPageProps> = () => {
  const { loading, data } = useQuery<Users>(USERS_QUERY)

  return (
    <Layout>
      <div className="mx-auto w-full text-center max-w-2xl ">
        {loading ? (
          <Loading />
        ) : (
          data?.allUsers.users.map((user) => (
            <div key={user.id} className="hover:bg-background-100">
              <Link to={`/${user.username}`}>
                <div className="flex  items-center gap-2 p-3">
                  <div className="flex-grow-0">
                    {user?.profile?.avatar ? (
                      <img
                        src={user.profile.avatar}
                        className="w-14 h-14 rounded-full"
                        alt="avatar"
                      />
                    ) : (
                      <IoPersonCircleOutline className="inline w-14 h-14 " />
                    )}
                  </div>
                  {user.profile?.name}
                  <div className="text-gray-500 flex gap-2 text-sm">
                    <div dir="ltr">{`@${user.username}`}</div>
                    <div>
                      {user?.profile?.createdAt &&
                        dateView(user.profile.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="bottom-0 h-px dark:bg-background-600 bg-background-200" />
              </Link>
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}
export default UsersPage
