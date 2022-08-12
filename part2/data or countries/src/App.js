import { useEffect, useState } from 'react'
import axios from 'axios'
import Message from './components/Message'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [weather, setWeather] = useState([])
  const [countryName, setCountryName] = useState('argentina')

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=${process.env.REACT_APP_API}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
  }, [countryName.name])
  
  const handleSearch = (event) => {
    const name = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))[0].name.common
    setNewCountry(event.target.value)
    setCountryName(name)
  }

  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))

  return (
    <>
      <form>
      find countries: <input value={newCountry} onChange={handleSearch} />
      </form>
      <Message countries={filterCountries}/>
      <Countries countries={filterCountries} handleSearch={handleSearch} />
      <Country countries={filterCountries} weather={weather} />
    </>
  )
}

export default App;
