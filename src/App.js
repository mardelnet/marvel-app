// App.js
import React, { useState, useEffect } from 'react';
import { getCharacters } from './utils/fetchData';
import Characters from './components/Characters/Characters';
import Footer from './components/Footer/Footer';
import SearchForm from './components/SearchForm/SearchForm';

function App() {
  const limitOfCharacters = 6;
  const [characters, setCharacters] = useState([]);
  const [offsetOfCharacters, setOffsetOfCharacters] = useState(0);

  const loadInitialCharacters = async () => {
    try {
      const newCharacters = await getCharacters(limitOfCharacters, offsetOfCharacters);
      setCharacters(newCharacters.data.results);
      setOffsetOfCharacters(prevOffset => prevOffset + limitOfCharacters);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreCharacters = async () => {
    try {
      const newCharacters = await getCharacters(limitOfCharacters, offsetOfCharacters);
      setCharacters(prevCharacters => [...prevCharacters, ...newCharacters.data.results]);
      setOffsetOfCharacters(prevOffset => prevOffset + limitOfCharacters);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInitialCharacters();
  }, []); // Load characters when component mounts

  const handleSearch = (searchResults) => {
    setCharacters(searchResults);
    setOffsetOfCharacters(0); // Reset offset for search results
  };

  return (
    <div className='container'>
      <SearchForm onSearch={handleSearch} />
      <Characters characters={characters}></Characters>
      <button className='button' onClick={loadMoreCharacters}>Load More</button>
      <Footer></Footer>
    </div>
  );
}

export default App;
