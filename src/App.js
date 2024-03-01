import React, { useState, useEffect } from 'react'
import { getCharacters, getSingleCharacter } from './utils/fetchData'

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
  const [textInput, setTextInput] = useState('')

  const getMarvelCharacters = async (search = false) => {
    try {
      let charactersData = []
      setIsLoading(true)

      if (search) {
        charactersData = await getSingleCharacter(textInput)
      } else {
        charactersData = await getCharacters(
          limitOfCharacters,
          offsetOfCharacters
        )
      }

      const charactersList = charactersData.data.results

      if (characters.length === 0) {
        setCharacters(charactersList)
      } else if (search) {
        setCharacters(charactersList)
      } else {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...charactersList,
        ])
      }

      if (search) {
        setOffsetOfCharacters(0)
      } else {
        setOffsetOfCharacters((prevOffset) => prevOffset + limitOfCharacters)
      }

      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (event) => {
    setTextInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    getMarvelCharacters(true)
  }

  useEffect(() => {
    getMarvelCharacters()
  }, []) // Load characters when component mounts

  return (
    <div className='container'>
      {isLoading && <Loader />}

      <SearchForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        textInput={textInput}
      />

      {characters && <Characters characters={characters} />}

      {!isLoading && (
        <Button buttonLabel='Load More' onClick={getMarvelCharacters} />
      )}

      <Footer />
    </div>
  )
}

export default App
