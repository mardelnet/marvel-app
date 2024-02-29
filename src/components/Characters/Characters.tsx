import React from 'react';
import styles from './Characters.module.scss';
import SingleCharacter from './SingleCharacter.tsx';

interface Character {
  id: number;
  name: string;
  description?: string;
  urls: { url: string }[];
  thumbnail: { path: string; extension: string };
}

interface CharactersProps {
  characters: Character[];
}

const Characters: React.FC<CharactersProps> = ({ characters }) => {
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
  );
};

export default Characters;
