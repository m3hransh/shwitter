import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { FC, ReactElement, useState } from 'react'
import { AuthContext, State, User, UserData } from './index'

export interface AuthProviderProps {
  children?: ReactElement
}

const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
const ME = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`
const initialState: State = {
  called: false,
}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null!)
  const [state, setState] = useState<State>(initialState)

  const [signupMutate, signupState] =
    useMutation<{ signup: UserData }>(SIGNUP_MUTATION)

  const signup = async (newUser: Omit<User, 'id'>) => {
    const { data, errors } = await signupMutate({
      variables: newUser,
    })
    // set the state so the consumer can access it
    setState(signupState)

    if (data) {
      localStorage.setItem('token', data.signup.token)
      setUser(data.signup.user)
    }
    // TODO: Write onError link for logging error later
    else {
      console.log(errors)
    }
    return data?.signup.user
  }

  const [loginMutate, loginState] =
    useMutation<{ login: UserData }>(LOGIN_MUTATION)

  const login = async (newUser: Omit<User, 'id' | 'name'>) => {
    const { data, errors } = await loginMutate({
      variables: newUser,
    })
    setState(loginState)

    if (data) {
      localStorage.setItem('token', data.login.token)
      setUser(data.login.user)
    }
    // Todo: Write onError link for logging error later
    else {
      console.log(errors)
    }
    return data?.login.user
  }

  const [meQuery, meState] = useLazyQuery<{ me: User }>(ME, {
  fetchPolicy: "network-only",   // Used for first execution
  nextFetchPolicy: "network-only" // Used for subsequent executions
})

  const getCurrentUser = async () => {
    console.log('getCurrent')
    const { data } = await meQuery()
    console.log('after call')
    setState(meState)

    if (data) {
      setUser(data.me)
    }
    return data?.me
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null!)
  }

  const value = { user, signup, login, logout, getCurrentUser, state }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}
export default AuthProvider
