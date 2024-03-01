import React from 'react'
import Button from '../Button/Button.tsx'
import styles from './SingleCharacters.module.scss'

interface SingleCharacterProps {
  name: string
  imageUrl: string
  description?: string
  extraInfoLink: string
}

const SingleCharacter: React.FC<SingleCharacterProps> = (props) => {
  const filterDescription = (text: string): string => {
    return text.length > 101 ? text.substring(0, 101) + '...' : text
  }

  return (
    <div>
      <div className={styles.item}>
        <img className={styles.image} src={props.imageUrl} alt={props.name} />
        <div className={styles.description}>
          <h3>{props.name}</h3>
          <div>
            {props.description
              ? filterDescription(props.description)
              : '(No description available)'}
          </div>
          <Button buttonLabel='Read more' icon='/icon_arrow.svg' />
        </div>
      </div>
    </div>
  )
}

export default SingleCharacter
