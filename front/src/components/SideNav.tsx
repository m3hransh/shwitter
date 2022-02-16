import { FC, useState } from 'react'
import {
  IoHomeOutline,
  IoPersonOutline,
  IoPeopleOutline,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import favicon from '../assets/shwitter-logo.png'
import { translation } from '../lib/translation'
import { useAuth } from './Auth'
import Logout from './Logout'
import Modal from './Modal'
import Shweet from './Shweet'
// import Tweet from './Tweet';

const SideNav: FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const {user} = useAuth()

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  // TODO: use context for the language
  const lang = 'ir'
  const content = translation[lang].sideNav

  return (
    <div className="ml-auto flex flex-col h-full pt-4 p-2 lg:text-lg ">
      <div className="flex flex-col space-y-4 items-center lg:items-start">
        <Link to="/users">
          <img src={favicon} alt="logo" className="w-12 h-12 mx-3" />
        </Link>
        <Link
          to="/"
          className="rounded-3xl p-2 dark:hover:bg-background-600 hover:bg-background-100"
        >
          <h2>
            <IoHomeOutline className="inline text-2xl mx-3" />
            <span className="hidden lg:inline-block">{content.home}</span>
          </h2>
        </Link>
        <Link
          to={`/${user.username}`}
          className="rounded-3xl p-2 hover:bg-background-100 dark:hover:bg-background-600"
        >
          <h2>
            <IoPersonOutline className="inline text-2xl mx-3" />
            <span className="hidden lg:inline-block">
              {content.profile}
            </span>
          </h2>
        </Link>
        {/* <Link to="#" className="rounded-3xl p-2 dark:hover:bg-background-600 hover:bg-background-100"> */}
        {/*   <h2> */}
        {/*     <IoMailOutline className="inline text-2xl mx-3" /> */}
        {/*     <span className="hidden lg:inline-block"> */}
        {/*       {content.messages} */}
        {/*     </span> */}
        {/*   </h2> */}
        {/* </Link> */}
        {/* <Link to="#" className="rounded-3xl p-2 dark:hover:bg-background-600 hover:bg-background-100"> */}
        {/*   <h2> */}
        {/*     <IoNotificationsOutline className="inline text-2xl mx-3" /> */}
        {/*     <span className="hidden lg:inline-block"> */}
        {/*       {content.notifications} */}
        {/*     </span> */}
        {/*   </h2> */}
        {/* </Link> */}
        {/* <Link to="#" className="rounded-3xl p-2 dark:hover:bg-background-600 hover:bg-background-100"> */}
        {/*   <h2> */}
        {/*     <IoEllipsisHorizontalOutline className="inline text-2xl mx-3" /> */}
        {/*     <span className="hidden lg:inline-block">{content.more}</span> */}
        {/*   </h2> */}
        {/* </Link> */}
        <Link
          to="/users"
          className="rounded-3xl p-2 dark:hover:bg-background-600 hover:bg-background-100"
        >
          <h2>
            <IoPeopleOutline className="inline text-2xl mx-3" />
            <span className="hidden lg:inline-block ">{content.more}</span>
          </h2>
        </Link>
      </div>
      <button
        className="bg-primary-400 mx-auto mt-4 border-0 border-primary rounded-3xl 
      py-2 w-10/12 text-white text-lg font-bold hover:bg-primary-200
      hidden lg:block 
      "
        onClick={openModal}
      >
        {content.shweet}
      </button>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <Shweet className="w-full" />
      </Modal>
      <Logout className="mt-auto mb-3" />
    </div>
  )
}
export default SideNav
