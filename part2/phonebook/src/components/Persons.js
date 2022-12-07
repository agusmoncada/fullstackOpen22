import React from "react" 

const Persons = ({ persons, removePerson }) => {
    return (
      persons.map(person => 
      <p key={person.id} >
        {person.name} {person.number} <button value={person.id} onClick={removePerson(person.name, person.id)}>delete</button>
      </p>)
    )
  }

  export default Persons