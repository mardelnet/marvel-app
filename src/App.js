import React, { useState, useEffect } from 'react';
import { getCharacters } from './utils/fetchData';
import Characters from './components/Characters/Characters';

function App() {
  const [characters, setCharacters] = useState([]);
  const [offsetOfCharacters, setOffsetOfCharacters] = useState(0);

  const loadMoreCharacters = async () => {
    const newCharacters = await getCharacters(6, offsetOfCharacters);
    setCharacters(prevCharacters => [...prevCharacters, ...newCharacters.data.results]);
    setOffsetOfCharacters(prevOffset => prevOffset + 6);
  };

  useEffect(() => {
    loadMoreCharacters();
  }, []); // Load characters when component mounts

  return (
    <div className='container'>
      <Characters characters={characters}></Characters>
      <button onClick={loadMoreCharacters}>Load More</button>
    </div>
  );
}

export default App;
