import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL } from './queries'
import LoginForm from './components/Login'

const App = () => {
  const [token, setToken ] = useState(null)
  const [page, setPage] = useState('authors')
  const response = useQuery(ALL)
  const client = useApolloClient()
  
  console.log(response.loading, response?.data)

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (response.loading) {
    return <div>Loading...</div>
  }
  
  if (!token) {
    return (
      <div>
        <h2>login</h2>
        <LoginForm setToken={setToken}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logOut}>log out</button>
      </div>

      <Authors show={page === 'authors'} authors={response.data?.allAuthors}/>

      <Books show={page === 'books'} books={response.data?.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
