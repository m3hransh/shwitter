import { FC, ReactElement } from 'react'
import { useAuth } from '../components/Auth'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import {
  IoArrowForwardOutline,
  IoLinkOutline,
  IoLocationOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5'
import { translation } from '../lib/translation'
import EditProfile from '../components/EditProfile'

export interface ProfileProps {
  children?: ReactElement
}

const Profile: FC<ProfileProps> = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  //TODO: use context for the language
  const lang = 'ir'
  const elements = translation[lang].profile

  return (
    <Layout>
      <div className="flex flex-col">
        {/* Profile head  */}
        <div className=" p-2 flex gap-2 items-baseline">
          <div className="p-2 flex justify-center items-center rounded-full w-8 h-8 hover:bg-background-200">
            <IoArrowForwardOutline
              onClick={() => navigate(-1)}
              className="text-opacity-80 "
            />
          </div>
          {/* NickName */}
          <h3 className="text-xl font-bold">{user.profile?.name}</h3>
        </div>
        {/* Profile Body */}
        <div className="bg-slate-600 h-48 w-full"></div>
        <div className="px-4">
          <div className="flex items-center">
            <div className="-mt-16">
              {user?.profile?.avatar ? (
                <img
                  src={user.profile.avatar}
                  className="w-36 h-36 rounded-full"
                  alt="avatar"
                />
              ) : (
                <IoPersonCircleOutline className="inline w-36 h-36" />
              )}
            </div>
            {/* Make Profile */}
            <EditProfile
              className="mr-auto bg-white block 
                rounded-3xl py-2 px-3 text-gray-800 border-2 
                border-opacity-90font-bold hover:bg-background-200"
              title={elements.editButton}
            />
            {/* ) : ( */}
            {/*   <CreateProfile */}
            {/*     className="ml-auto bg-white block  */}
            {/*   rounded-3xl py-2 px-3 text-gray-800 border-2  */}
            {/*   border-opacity-90 font-bold hover:bg-accent" */}
            {/*   /> */}
            {/* )} */}
          </div>
          <h3 className="text-xl font-bold">{user.profile?.name}</h3>
          {user?.profile?.bio ? (
            <p className="mt-3 space-x-2">{user.profile.bio}</p>
          ) : null}
          <div className="text-sm text-main-500 flex gap-2">

          {user?.profile?.website ? (
            <p className="mt-3 flex gap-1 items-center">
              <IoLinkOutline className="inline text-lg" />
              <a href={`http://${user.profile.website}`} target="_blank">
                {user.profile.website}
              </a>
            </p>
          ) : null}
          {user?.profile?.location ? (
            <p className="mt-3 flex gap-1 items-center">
              <IoLocationOutline className="inline text-lg" />
                {user.profile.location}
            </p>
          ) : null}
          {/* Followers  */}
          </div>
          <div className="flex mt-3 gap-4">
            <p>
              <span className="font-bold">۲۰۰</span> {elements.follower}
            </p>
            <p>
              <span className="font-bold">۲۰</span> {elements.following}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
