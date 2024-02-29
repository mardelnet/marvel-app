import React from 'react';
import styles from './MultipleCharacters.module.scss';
import SingleCharacter from '../Single/SingleCharacter.tsx';

/**
 * Interface for character objects.
 * 
 * @typedef {Object} Character
 * @property {number} id - ID of the character.
 * @property {string} name - Name of the character.
 * @property {string | undefined} [description] - Description of the character (optional).
 * @property {{ url: string }[]} urls - URLs related to the character.
 * @property {{ path: string; extension: string }} thumbnail - Thumbnail details of the character.
 */
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

/**
 * Characters component.
 * Displays multiple character items.
 * 
 * @param {Object} props - Props for the Characters component.
 * @param {Character[]} props.characters - Array of character objects.
 * @returns {JSX.Element | null} Characters component
 */
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
