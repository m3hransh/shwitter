import { FC, ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

export interface UsersProps {
  children?: ReactElement
}

export const USERS_QUERY = gql`
  query Users {
    allUsers {
      users {
        id
        username
        email
      }
      count
    }
  }
`
export interface AllUsers {
  allUsers: {
    users: {
      id: string
      username: string
      email: string
    }[]
    count: number
  }
}
const Users: FC<UsersProps> = () => {
  const { loading, error, data } = useQuery<AllUsers>(USERS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  if (!data) return <p>Not found</p>
  return (
    <div className="bg-background-600 pt-6 h-screen">
      <div className="mx-auto text-center p-3 text-main-50 bg-background-800 max-w-2xl text-xl">
        <div className="text-2xl font-bold mb-5">کاربران</div>
        <div className="grid grid-cols-3 gap-y-2">
          <div className="bg-background-500">شناسه</div>
          <div className="bg-background-500">نام</div>
          <div className="bg-background-500">ایمیل</div>
        </div>
        {data.allUsers.users.map(({ id, username, email }) => (
          <div key={id} className="grid grid-cols-3 gap-y-2">
            <div className="">{id}</div>
            <div className="">{username}</div>
            <div className="">{email}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Users
