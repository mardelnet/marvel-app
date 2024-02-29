import styles from './Characters.module.scss';
import SingleCharacter from './SingleCharacter';

function Characters(props) {
  return (
      props.characters && (
      <div className={styles.container}>
        {props.characters.map(item => (
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
