import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { FC, ReactElement, useState } from 'react'
import { AuthContext } from '.'
import { AuthPayload, AuthState, User } from '../../types'


export interface AuthProviderProps {
  children?: ReactElement
}
const isDev = process.env.NODE_ENV === 'development'

const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!, $username: String!) {
    signup(name: $name, email: $email, password: $password, username:$username) {
      token
      user {
        id
        username
        email
        profile {
          avatar
          bio
          location
          website
          createdAt
        }
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
        username
        email
        profile {
          name
          avatar
          bio
          location
          website
          createdAt
        }
      }
    }
  }
`
export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      profile {
        name
        avatar
        bio
        location
        website
        createdAt
      }
    }
  }
`
const initialState: AuthState = {
  called: false,
}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null!)
  const [state, setState] = useState<AuthState>(initialState)

  const [signupMutate, signupState] =
    useMutation<{ signup: AuthPayload }>(SIGNUP_MUTATION)

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
    useMutation<{ login: AuthPayload }>(LOGIN_MUTATION)

  const login = async (newUser: Omit<User, 'id' | 'username'>) => {
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

  const [meQuery, meState] = useLazyQuery<{ me: User }>(ME_QUERY, {
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
    onCompleted: (data) => {
      setUser(data.me)
      setState(meState)
    },
    onError: (error) => {
      if (isDev)
        console.error(error)      
      setState({called:true})
    }
  })

  const getCurrentUser = async () => {
    meQuery()
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
