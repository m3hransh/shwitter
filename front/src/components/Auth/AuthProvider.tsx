import { gql, useMutation } from '@apollo/client'
import { FC, ReactElement, useState } from 'react'
import { AuthContext, User, UserData } from './index'

export interface AuthProviderProps {
  children?: ReactElement
}

const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user{
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
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null!)

  const [signupMutate, signupState] =
    useMutation<{signup:UserData}>(SIGNUP_MUTATION)
  const signup = async (newUser: Omit<User, 'id'>) => {
    const { data, errors } = await signupMutate({
      variables: newUser,
    })
    //
    console.log(data?.signup.token)
    if (data) {
      localStorage.setItem('token', data.signup.token)
      setUser(data.signup.user)
    }
    // Todo: Write onError link for logging error later
    else {
      console.log(errors)
    }
  }

  const [loginMutate, loginState] = useMutation<UserData>(LOGIN_MUTATION, {
    onCompleted: ({ token, user }) => {
      localStorage.setItem('token', token)
      setUser(user)
    },
  })
  const login = async (newUser: Omit<User, 'id' | 'name'>) => {
    const { data, errors } = await loginMutate({
      variables: newUser,
    })
    //
    if (data) {
      localStorage.setItem('token', data.token)
      setUser(data.user)
    }
    // Todo: Write onError link for logging error later
    else {
      console.log(errors)
    }
  }
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null!)
  }

  const value = { user, signup, signupState, login, loginState, logout }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}
export default AuthProvider
