import React from "react"

const Form = ({ add, newName, newPhone, handleNewName, handleNewPhone }) => {
    return (
      <form onSubmit={add}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
          number: <input value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default Form