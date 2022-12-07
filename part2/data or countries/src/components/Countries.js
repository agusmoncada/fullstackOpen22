import React from "react";

const Countries = ({ countries, handleSearch }) => {
    if (countries.length > 10 || countries.length === 1) {
      return null
    }
  
    return countries.map(country => 
      <div key={country.name.common}>
        {country.name.common} <button value={country.name.common} type='button' onClick={handleSearch}>show</button>
      </div>)
  }

export default Countries