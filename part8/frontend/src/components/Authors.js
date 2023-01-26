import Select from "react-select"
import { useState } from "react"
import { ALL, EDIT_AUTHOR } from "../queries"
import { useMutation } from "@apollo/client"

const Authors = ({ show, authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL }]
  })

  const submit = (event) => {
    event.preventDefault()
    const author = {
      name: selectedOption.value,
      setBornTo: Number(born)
    }

    console.log(author)

    editAuthor({ variables: { ...author } })
    setBorn('')
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Select defaultValue={selectedOption} onChange={setSelectedOption} options={authors.map(a => {
       return {value: a.name, label: a.name}
      })}/>
      <form onSubmit={submit}>
        <label>born</label>
        <input value={born} onChange={({ target }) => setBorn(target.value)}/>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Authors
