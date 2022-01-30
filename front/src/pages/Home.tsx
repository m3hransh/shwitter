import { useQuery } from '@apollo/client'
import { FC, ReactElement } from 'react'
import { AllUsers, USERS_QUERY } from './Users'

export interface HomeProps {
  children?: ReactElement
}

const Home: FC<HomeProps> = () => {
  const { loading, error, data } = useQuery<AllUsers>(USERS_QUERY)
  console.log(data)

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
        {data.allUsers.users.map(({ id, name, email }) => (
          <div key={id} className="grid grid-cols-3 gap-y-2">
            <div className="">{id}</div>
            <div className="">{name}</div>
            <div className="">{email}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
