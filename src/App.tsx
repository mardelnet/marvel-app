import React, { useState, useEffect } from 'react'
import { getCharacters, getSingleCharacter } from './utils/fetchData.ts'

import Characters from './components/Characters/Characters.tsx'
import Footer from './components/Footer/Footer.tsx'
import SearchForm from './components/SearchForm/SearchForm.tsx'
import Button from './components/Button/Button.tsx'
import Loader from './components/Loader/Loader.tsx'

interface Character {
  id: number
  name: string
  description: string
  urls: { url: string }[]
  thumbnail: { path: string; extension: string }
}

interface CharactersData {
  data: {
    results: Character[]
  }
}

const App: React.FC = () => {
  const limitOfCharacters = 6
  const [characters, setCharacters] = useState<Character[]>([])
  const [offsetOfCharacters, setOffsetOfCharacters] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [textInput, setTextInput] = useState<string>('')

  const getMarvelCharacters = async (search = false) => {
    try {
      let charactersData: CharactersData
      setIsLoading(true)

      if (search) {
        charactersData = await getSingleCharacter(textInput)
      } else {
        charactersData = await getCharacters(
          limitOfCharacters,
          offsetOfCharacters
        )
      }

      const charactersList: Character[] = charactersData.data.results

      if (characters.length === 0 || search) {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

      {characters.length > 0 && <Characters characters={characters} />}

      {!isLoading && (
        <Button buttonLabel='Load More' onClick={() => getMarvelCharacters()} />
      )}

      <Footer />
    </div>
  )
}

export default App
