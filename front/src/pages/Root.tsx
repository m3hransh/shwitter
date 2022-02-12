import { FC, ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import GithubCorner from 'react-github-corner'

export interface RootProps {
  children?: ReactElement
}

const Root: FC<RootProps> = () => {
  return (
    <div className="bg-background-50 h-screen">
      <GithubCorner className="hidden sm:block" href="https://github.com/m3hransh/shwitter" />
      <Outlet />
    </div>
  )
}
export default Root
