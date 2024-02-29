import React, { useState, useEffect } from 'react';
import { getCharacters } from './utils/fetchData';
import Characters from './components/Characters/Characters';

function App() {
  const limitOfCharacters = 6;

  const [characters, setCharacters] = useState([]);
  const [offsetOfCharacters, setOffsetOfCharacters] = useState(0);

  const loadMoreCharacters = async () => {
    const newCharacters = await getCharacters(limitOfCharacters, offsetOfCharacters);
    setCharacters(prevCharacters => [...prevCharacters, ...newCharacters.data.results]);
    setOffsetOfCharacters(prevOffset => prevOffset + limitOfCharacters);
  };

  useEffect(() => {
    loadMoreCharacters();
  }, []); // Load characters when component mounts

  return (
    <div className='container'>
      <Characters characters={characters}></Characters>
      <button className='button' onClick={loadMoreCharacters}>Load More</button>
    </div>
  );
}

export default App;
