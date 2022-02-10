import { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  IoNotificationsOutline,
  IoMailOutline,
  IoHomeOutline,
  IoSearchOutline,
} from 'react-icons/io5'
import cn from 'classnames'

export interface MobileNavProps {
  children?: ReactElement
  className?: string
}

const MobileNav: FC<MobileNavProps> = ({ className }) => {
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
      <Link to="/profile" className="rounded-3xl p-2 hover:bg-accent">
        <h2>
          <IoSearchOutline className="inline text-2xl mx-3" />
        </h2>
      </Link>
      <Link to="#" className="rounded-3xl p-2 hover:bg-accent">
        <h2>
          <IoNotificationsOutline className="inline text-2xl mx-3" />
        </h2>
      </Link>
      <Link to="#" className="rounded-3xl p-2 hover:bg-accent">
        <h2>
          <IoMailOutline className="inline text-2xl mx-3" />
        </h2>
      </Link>
    </div>
  )
}

export default MobileNav
