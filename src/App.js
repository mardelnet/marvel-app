// App.js
import React, { useState, useEffect } from 'react'
import { getCharacters } from './utils/fetchData'

import Characters from './components/Characters/Characters'
import Footer from './components/Footer/Footer'
import SearchForm from './components/SearchForm/SearchForm'
import Button from './components/Button/Button'
import Loader from './components/Loader/Loader'

function App() {
  const limitOfCharacters = 6
  const [characters, setCharacters] = useState([])
  const [offsetOfCharacters, setOffsetOfCharacters] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = (searchResults) => {
    setCharacters(searchResults)
    setOffsetOfCharacters(0) // Reset offset for search results
  }

  const getMarvelCharacters = async () => {
    try {
      setIsLoading(true)
      const charactersData = await getCharacters(
        limitOfCharacters,
        offsetOfCharacters
      )
      const charactersList = charactersData.data.results

      if (characters.length === 0) {
        setCharacters(charactersList)
      } else {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...charactersList,
        ])
      }

      setOffsetOfCharacters((prevOffset) => prevOffset + limitOfCharacters)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMarvelCharacters()
  }, []) // Load characters when component mounts

  return (
    <div className='container'>
      {isLoading && <Loader />}

      <SearchForm onSearch={handleSearch} setIsLoading={setIsLoading} />

      {characters && <Characters characters={characters} />}

      {!isLoading && (
        <Button buttonLabel='Load More' onClick={getMarvelCharacters} />
      )}

      <Footer />
    </div>
  )
}

export default App
