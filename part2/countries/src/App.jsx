import { useEffect, useState } from 'react'
import Country from './components/Country'
import countryService from './services/countryService'
import Weather from './components/Weather'
import Filter from './components/Filter'

const App = () => {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState('')
  const [countryWeather, setCountryWeather] = useState('')
  const [prevCountry, setPrevCountry] = useState('')
  useEffect(
    () => {
      countryService
        .getAll()
        .then(response => setCountries(response.map(country => country.name.common.toLowerCase())))
    }, []
  )

  useEffect(
    () => {
      if (countryWeather && countryWeather !== prevCountry) {
        countryService
        .fetchWeather(countryWeather)
        .then(response => setWeather(response))
      }
      setPrevCountry(countryWeather)
    }, [countryWeather, prevCountry]
  )


  const handleSearch = (event) => {
    const search = event.target.value
    setSearch(search)
  }

  let countryToShow = []

  if (search) {
    countryToShow = countries.filter(country => country.includes(search.toLowerCase()))
  }

  const handleFetchCountry = (country) => {
    countryService
      .fetchCountry(country)
      .then(returnedCountry => {
        setCountry(returnedCountry)
      })
  }



  const handleShow = (country) => {
    handleFetchCountry(country)
    countryToShow = []

    if (country !== countryWeather) {
      setCountryWeather(country)
    }
  }

  if (countryToShow.length === 1) {
    const country = countryToShow[0]
    handleFetchCountry(country)
    countryToShow = []
    if (country !== countryWeather) {
      setCountryWeather(country)
    }
  }

  if (countryToShow.length > 10) {
    countryToShow = ['Too many matches, specify another filter']
  }


  let languages, capital, flag, wind, icon, temp, name, area = ''

  if (weather) {
    temp = (weather.main.temp - 273.15).toFixed(2)
    icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    wind = weather.wind.speed
  }
  if (country) {
    languages = Object.values(country.languages)
    capital = country.capital
    flag = country.flags.png
    name = country.name.common
    area = country.area
  }

  return (
    <>
      <Filter
        handleSearch={handleSearch}
        handleShow={handleShow}
        countryToShow={countryToShow}
        />
    
      <Country
        name={name}
        capital={capital}
        languages={languages}
        flag={flag}
        area={area}
        />
      <Weather
      temp={temp}
      country={name}
      icon={icon}
      wind={wind} />
    </>
  )
}

export default App