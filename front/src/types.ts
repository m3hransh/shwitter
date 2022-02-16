import { MutationResult, QueryResult } from '@apollo/client'

export interface AuthContextType {
  user: User
  signup: (user: Omit<User, 'id'>) => Promise<User | undefined>
  login: (user: Omit<User, 'id' | 'username'>) => Promise<User | undefined>
  getCurrentUser: () => Promise<void>
  logout: () => void
  state: AuthState
}

type AuthinitialState = {
  called?: boolean
  data?: any
  error?: any
  loading?: any
}

export type AuthState = MutationResult | QueryResult | AuthinitialState

export interface AuthPayload {
  token: string
  user: User
}
export interface Feed {
  feed: {
    count: number
    shweets: Shweet[]
  }
}

export interface Shweet {
  id: number
  content: string
  createdAt: string
  author: User
  likedShweet: {
    user: User
  }[]
}

export interface User {
  id?: number
  username: string
  email: string
  profile?: Profile
  shweets?: Shweet[]
}

export interface Profile {
  name: string
  createdAt: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
}
export interface Users {
  allUsers: {
    users: User[]
    count: number
  }
}

export interface TrendElement {
  category: string
  name: string
  tweetNumber: number
}
