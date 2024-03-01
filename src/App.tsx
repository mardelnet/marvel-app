import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getCharacters, getSingleCharacter } from './utils/fetchData.ts'

import Characters from './components/Characters/Characters.tsx'
import Footer from './components/Footer/Footer.tsx'
import SearchForm from './components/SearchForm/SearchForm.tsx'
import Button from './components/Button/Button.tsx'
import Loader from './components/Loader/Loader.tsx'

/**
 * Interface representing the structure of a character object.
 * @interface
 */
interface Character {
  id: number
  name: string
  description: string
  urls: { url: string }[]
  thumbnail: { path: string; extension: string }
}

/**
 * Interface representing the structure of characters data returned by API.
 * @interface
 */
interface CharactersData {
  data: {
    results: Character[]
  }
}

/**
 * Main application component.
 * @component
 */
const App: React.FC = () => {
  const limitOfCharacters = 6
  const [characters, setCharacters] = useState<Character[]>([])
  const [offsetOfCharacters, setOffsetOfCharacters] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [textInput, setTextInput] = useState<string>('')

  /**
   * Function to fetch Marvel characters data from API.
   * @param {boolean} search - Indicates if it's a search operation.
   * @returns {void}
   */
  const getMarvelCharacters = async (search = false): Promise<void> => {
    try {
      setIsLoading(true)
      let charactersData: CharactersData

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

  /**
   * Event handler for input change in search form.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   * @returns {void}
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTextInput(event.target.value)
  }

  /**
   * Event handler for form submission in search form.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @returns {void}
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    getMarvelCharacters(true)
  }

  /**
   * Load characters when component mounts.
   */
  useEffect(() => {
    getMarvelCharacters()
  }, [])

  return (
    <div className='container'>
      {isLoading && <Loader />}

      <SearchForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        textInput={textInput}
      />

      {characters.length > 0 && <Characters characters={characters} />}

      {characters.length === 0 && <p>No results...</p>}

      {!isLoading && (
        <Button
          inverted
          buttonLabel='Load More'
          onClick={() => getMarvelCharacters()}
          icon={<FontAwesomeIcon icon={faArrowRight} />}
          data-testid='load-more-button'
        />
      )}

      <Footer />
    </div>
  )
}

export default App
