import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
    if (name) {
      axios.get(baseUrl + name)
        .then(res => setCountry(res.data))
        .catch(() => setCountry('not found'))
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (country === 'not found') {
    return (
      <div>
        not found...
      </div>
    )
  }

  if (country) {
    return (
      <div>
        <h3>{country.name.common} </h3>
        <div>capital {country.capital} </div>
        <div>population {country.population}</div> 
        <img src={country.flags.png} height='100' alt={`flag of ${country.flags.alt}`}/>  
      </div>
    )
  }
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App