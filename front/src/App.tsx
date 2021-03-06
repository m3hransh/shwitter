import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequiredAuth, AuthProvider } from './components/Auth'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Root from './pages/Root'
import Signup from './pages/Signup'
import UsersPage from './pages/UsersPage'

// default value in dev environment
let GRAPHQL_URL = 'http://localhost:4000'

if (process.env?.REACT_APP_GRAPHQL_URL) {
  GRAPHQL_URL = process.env?.REACT_APP_GRAPHQL_URL
} else {
  if (process.env.NODE_ENV === 'production')
    throw new Error(
      'Please Provide the REACT_APP_GRAPHQL_URL in file "front/.env"',
    )
}

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route
                index
                element={
                  <RequiredAuth>
                    <Home />
                  </RequiredAuth>
                }
              />
              <Route
                path=":username"
                element={
                  <RequiredAuth>
                    <Profile />
                  </RequiredAuth>
                }
              />
              <Route path="landing" element={<Landing />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route
                path="users"
                element={
                  <RequiredAuth>
                    <UsersPage />
                  </RequiredAuth>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
