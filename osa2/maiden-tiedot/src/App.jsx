import { useState } from 'react'
import Filter from './components/Filter'

function App() {
  const [filter, setFilter] = useState('')

  const filteredCountries = filter
    ? countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    : []

  const showCountries = filter && filteredCountries.length > 10
    ? "Too many matches, specify another filter"
    : filteredCountries

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Welcome to country finder!</h1>
      <Filter value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default App
