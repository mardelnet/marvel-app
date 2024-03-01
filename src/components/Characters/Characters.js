import React from 'react'
import styles from './Characters.module.scss'
import SingleCharacter from './SingleCharacter'

function Characters({ characters }) {
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
          ></SingleCharacter>
        ))}
      </div>
    )
  )
}

export default Characters
