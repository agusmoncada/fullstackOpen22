import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL, BOOK_ADDED, ME } from './queries'
import LoginForm from './components/Login'
import Recommend from './components/recommendations'

const App = () => {
  const [token, setToken ] = useState(null)
  const [page, setPage] = useState('authors')
  const [genre, setGenre] = useState(null)
  const { data } = useQuery(ME)
  const response = useQuery(ALL, {
    variables: { genre }
  })
  const client = useApolloClient()

  useSubscription( BOOK_ADDED, { onData: ({data}) => {
      console.log('data: ',data)
      const bookAdded = data.data.bookAdded
      console.log('book added: ',bookAdded);
      
      client.cache.updateQuery({ query: ALL }, (datas) => {
        console.log('datas',datas)
        return {          
          data: datas.allBooks.concat(bookAdded),        
        }      
      })
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [setToken])
  
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
        <button onClick={() => { setGenre(data.me.favouriteGenre); setPage('recommend') }}>recommend</button>
        <button onClick={logOut}>log out</button>
      </div>

      <Authors show={page === 'authors'} authors={response.data?.allAuthors}/>

      <Books show={page === 'books'} books={response.data?.allBooks} setGenre={setGenre} selectedGenre={genre}/>

      <NewBook show={page === 'add'} setGenre={setGenre} />

      <Recommend show={page === 'recommend'} favorite={'favorite'} data={data} setGenre={setGenre} books={response.data?.allBooks}/>
    </div>
  )
}

export default App
