import { FC, ReactElement } from 'react'

export interface ErrorMessageProps {
  children: ReactElement
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  return (
    <div className="h-6">
      <p className="text-sm text-rose-400">{children}</p>
    </div>
  )
}
export default ErrorMessage
