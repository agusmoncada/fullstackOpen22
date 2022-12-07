import React from "react"

const Country = ({ countries, weather }) => {
    if (countries.length === 1) {
      return (
        <>
        <h1>{countries[0].name.common}</h1>
        <p>capital {countries[0].capital[0]}</p>
        <p>area {countries[0].area}</p>
  
        <h2>languages</h2>
        <ul>
          {Object.values(countries[0].languages).map(language => <li key={language} >{language}</li>)}
        </ul>
        <img src={countries[0].flags.png} width="100ppx" />
        <h2>weather in {countries[0].name.common}</h2>
        <p>temperature {weather.main.temp} celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>wind {weather.wind.speed} m/s</p>
        </>
      )
    }
  
    return null
  }

export default Country