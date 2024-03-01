import React from 'react';
import Button from '../Button/Button.tsx';
import styles from './SingleCharacters.module.scss';

interface SingleCharacterProps {
  imageUrl: string;
  name: string;
  description?: string;
  extraInfoLink: string;
}

const SingleCharacter: React.FC<SingleCharacterProps> = (props) => {
  const filterDescription = (text: string): string => {
    return text.length > 101 ? text.substring(0, 101) + '...' : text;
  };

  return (
    <div>
      <div className={styles.item}>
        <img className={styles.image} src={props.imageUrl} alt={'altText'} />
        <div className={styles.description}>
          <h3>{props.name}</h3>
          <div>
            {props.description
              ? filterDescription(props.description)
              : '(No description available)'}
          </div>
          <Button
            buttonLabel='Read more'
            link={props.extraInfoLink}
            icon='/icon_arrow.svg'
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default SingleCharacter;
