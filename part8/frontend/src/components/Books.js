
const Books = ({ show, books, setGenre }) => {

  const submit = (event) => {
    event.preventDefault()
    const genre = event.target.value
    console.log(genre)
    setGenre(genre)
  }
  if (!show) {
    return null
  }
  const genres = [...new Set(books.map((b) => b.genres[0]).filter(g => g !== undefined))]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (<button onClick={submit} value={g} >{g}</button>) )}
      <button onClick={() => setGenre(null)}>reset filter</button>
    </div>
  )
}

export default Books
