import { FC, ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

export interface RootProps {
  children?: ReactElement
}

const Root: FC<RootProps> = () => {
  return (
    <div className="bg-background-50 h-screen">
      <Outlet />
    </div>
  )
}
export default Root
