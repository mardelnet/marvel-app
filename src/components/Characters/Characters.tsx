import React from 'react'
import styles from './Characters.module.scss'
import SingleCharacter from './SingleCharacter.tsx'

/**
 * Interface representing the shape of a character.
 */
interface Character {
  id: number
  name: string
  description: string
  urls: { url: string }[]
  thumbnail: { path: string; extension: string }
}

/**
 * Props interface for the Characters component.
 */
interface CharactersProps {
  /**
   * Array of characters to be displayed.
   */
  characters: Character[]
}

/**
 * Characters component.
 * Renders a list of characters.
 * @param {CharactersProps} props - Props for the Characters component.
 * @returns {JSX.Element | null} - Rendered Characters component or null if characters array is empty.
 */
const Characters: React.FC<CharactersProps> = ({ characters }) => {
  if (characters.length === 0) {
    return null
  }
  
  return (
    characters && (
      <div className={styles.container}>
        {characters.map((item) => (
          <SingleCharacter
            key={item.id}
            name={item.name}
            description={item.description}
            extraInfoLink={item.urls[0].url}
            imageUrl={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          />
        ))}
      </div>
    )
  )
}

export default Characters
