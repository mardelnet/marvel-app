import React, { useState, useEffect } from 'react';
import { getAllCharacters } from './utils/fetchData';
import Characters from './components/Characters/Characters';

function App() {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    const setChars = async () => {
      const characters = await getAllCharacters();
      setCharacters(characters);
    }
    setChars();
  }, []);

  return (
    <div className='container'>
      <Characters characters={characters}></Characters>
    </div>
  );
}

export default App;
