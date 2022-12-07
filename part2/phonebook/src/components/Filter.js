import React from "react"

const Filter = ({ newSearch, handleNewSearch }) => {
    return (
      <form>
        <div>filter shown with <input value={newSearch} onChange={handleNewSearch} /> </div>
      </form>
    )
  }

  export default Filter