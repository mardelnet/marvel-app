import React, { useEffect } from 'react';
import { getCharacters } from '../../utils/fetchData';
import styles from './Characters.module.scss';
import SingleCharacter from './SingleCharacter';

function Characters({ onLoadMore, limitOfCharacters, offsetOfCharacters, setOffsetOfCharacters, characters }) {

  useEffect(() => {
    const loadInitialCharacters = async () => {
      try {
        const newCharacters = await getCharacters(limitOfCharacters, offsetOfCharacters);
        setOffsetOfCharacters(prevOffset => prevOffset + limitOfCharacters);
        onLoadMore(newCharacters.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    loadInitialCharacters();
  }, []); // Load characters when component mounts

  return (
      characters && (
      <div className={styles.container}>
        {characters.map(item => (
          <SingleCharacter 
            name={item.name}
            description={item.description}
            extraInfoLink={item.urls[0].url}
            imageUrl={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          >    
          </SingleCharacter>
        ))}
      </div>
    )
  );
}

export default Characters;
