import React from 'react'
import Button from '../Button/Button.tsx'
import styles from './SingleCharacters.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

/**
 * Props interface for the SingleCharacter component.
 */
interface SingleCharacterProps {
  /**
   * The name of the character.
   */
  name: string

  /**
   * The URL of the character's image.
   */
  imageUrl: string

  /**
   * The description of the character.
   */
  description?: string

  /**
   * The URL for extra information about the character.
   */
  extraInfoLink: string
}

/**
 * SingleCharacter component.
 * Displays information about a single character.
 * @param {SingleCharacterProps} props - Props for the SingleCharacter component.
 * @returns {JSX.Element} - Rendered SingleCharacter component.
 */
const SingleCharacter: React.FC<SingleCharacterProps> = (props) => {
  /**
   * Filters the character description to a maximum of 101 characters.
   * @param {string} text - The character description.
   * @returns {string} - The filtered character description.
   */
  const filterDescription = (text: string): string => {
    return text.length > 101 ? text.substring(0, 101) + '...' : text
  }

  return (
    <div>
      <div className={styles.item}>
        <img className={styles.image} src={props.imageUrl} alt={props.name} data-testid="character-image" />
        <div className={styles.description}>
          <h3>{props.name}</h3>
          <div>
            {props.description
              ? filterDescription(props.description)
              : '(No description available)'}
          </div>
          <Button
            buttonLabel='Read more'
            openInNewTab
            href={props.extraInfoLink}
            icon={<FontAwesomeIcon icon={faArrowRight}
            data-testid="character-link" />}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleCharacter
