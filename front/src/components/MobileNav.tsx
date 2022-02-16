import { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  IoHomeOutline,
  IoLogoGithub,
  IoPersonOutline,
  IoPeopleOutline,
} from 'react-icons/io5'
import cn from 'classnames'
import { useAuth } from './Auth'

export interface MobileNavProps {
  children?: ReactElement
  className?: string
}

const MobileNav: FC<MobileNavProps> = ({ className }) => {
  const {user} = useAuth()
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-around dark:text-main-50 lg:items-start',
      )}
    >
      <Link to="/" className="rounded-3xl p-2 hover:bg-accent">
        <h2>
          <IoHomeOutline className="inline text-2xl mx-3" />
        </h2>
      </Link>
      <Link
        to={`/${user.username}`}
        className="rounded-3xl p-2 hover:bg-accent"
      >
        <h2>
          <IoPersonOutline className="inline text-2xl mx-3" />
        </h2>
      </Link>
      <Link to="/users" className="rounded-3xl p-2 hover:bg-accent">
        <h2>
          <IoPeopleOutline className="inline text-2xl mx-3" />
        </h2>
      </Link>
      <a
        href="https://github.com/m3hransh/shwitter"
        className=" p-2 bg-background-900"
      >
        <h2>
          <IoLogoGithub className="inline text-2xl text-main-50 mx-3" />
        </h2>
      </a>
    </div>
  )
}

export default MobileNav
