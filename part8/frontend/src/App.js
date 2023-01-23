import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const response = useQuery(ALL)
  
  console.log(response.loading, response?.data)

  if (response.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={response.data.allAuthors}/>

      <Books show={page === 'books'} books={response.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
