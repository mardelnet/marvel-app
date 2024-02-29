import React from 'react';
import { getCharacters } from '../../utils/fetchData';

function LoadMore({ onLoadMore, limitOfCharacters, offsetOfCharacters, setOffsetOfCharacters }) {

  const loadMoreCharacters = async () => {
    try {
      const newCharacters = await getCharacters(limitOfCharacters, offsetOfCharacters);
      setOffsetOfCharacters(prevOffset => prevOffset + limitOfCharacters);
      onLoadMore(newCharacters.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className='button' onClick={loadMoreCharacters}>Load More</button>
  );
}

export default LoadMore;
