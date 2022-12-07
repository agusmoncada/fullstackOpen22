import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ErroMessage from './components/ErrorMessage'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertError, setAlertError] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => setPersons(response.data))
    .catch(response => console.log(response))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newPhone
    }

    const alreadyExists = persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())
    
    const add = () => {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setAlertMessage(`${newName} was added to the phonebook`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 4000)
      })
      .catch(error => {
        setAlertError(`${error.response.data.error}`)
        setTimeout(() => {
          setAlertError(null)
        }, 4000)
      })
        
        
    }

    const update = () => {
      const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const newPerson = {...person, number: newPhone}
      
      personService
      .update(newPerson.id, newPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson))
        setAlertMessage(`${newPerson.name} was updated`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 4000)
      })
      .catch(error => {
        setAlertError(`${error.response.data.error}`)
        setTimeout(() => {
          setAlertError(null)
        }, 4000)
      })
    }

    const confirmUpdate = () => window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)

    alreadyExists ? (confirmUpdate() ? update() : add()) : add()

    setNewName("")
    setNewPhone("")
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    
  }

  const removePerson = (name, id) => {
    return () => {
      if (window.confirm(`delete ${name} ?`)) {
        personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setAlertMessage(`${name} was deleted`)
          setTimeout(() => {
          setAlertMessage(null)
        }, 4000)
        })
        .catch(response => console.log(response))}  
    }      
  }
  
  const personsToShow = newSearch ? persons.filter(person => person.name.toLocaleLowerCase().includes(newSearch)) : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <ErroMessage message={alertError} />
      <Notification message={alertMessage} />
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      
      <h2>add new</h2>
      
      <Form add={addPerson} newName={newName} newPhone={newPhone} handleNewName={handleNewName} handleNewPhone={handleNewPhone} />

      <h2>Numbers</h2>
      
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App