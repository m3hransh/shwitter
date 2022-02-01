import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequiredAuth, AuthProvider } from './components/Auth'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Root from './pages/Root'
import Signup from './pages/Signup'
import Users from './pages/Users'

// default value in dev environment
let GRAPHQL_URL = 'http://localhost:4000'

if (process.env?.REACT_APP_GRAPHQL_URL){
  GRAPHQL_URL = process.env?.REACT_APP_GRAPHQL_URL
}
else{
  if(process.env.NODE_ENV === 'production')
    throw new Error('Please Provide the REACT_APP_GRAPHQL_URL in file "front/.env"')
}
  
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
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
  link: authLink.concat(httpLink),
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
              <Route path="landing" element={<Landing />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
