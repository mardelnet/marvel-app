// App.js
import React, { useState, useEffect } from 'react';
import { getCharacters } from './utils/fetchData';
import Characters from './components/Characters/Characters';
import Footer from './components/Footer/Footer';
import SearchForm from './components/SearchForm/SearchForm';
import LoadMore from './components/LoadMore/LoadMore';

function App() {
  const limitOfCharacters = 6;
  const [characters, setCharacters] = useState([]);
  const [offsetOfCharacters, setOffsetOfCharacters] = useState(0);

  useEffect(() => {
    const loadInitialCharacters = async () => {
      try {
        const newCharacters = await getCharacters(limitOfCharacters, offsetOfCharacters);
        setCharacters(newCharacters.data.results);
        setOffsetOfCharacters(prevOffset => prevOffset + limitOfCharacters);
      } catch (error) {
        console.error(error);
      }
    };
    
    loadInitialCharacters();
  }, []); // Load characters when component mounts

  const handleSearch = (searchResults) => {
    setCharacters(searchResults);
    setOffsetOfCharacters(0); // Reset offset for search results
  };

  const loadMoreCharacters = (searchResults) => {
    setCharacters(prevCharacters => [...prevCharacters, ...searchResults]);
  };

  return (
    <div className='container'>
      <SearchForm onSearch={handleSearch} />
      <Characters characters={characters}></Characters>
      <LoadMore 
        onLoadMore={loadMoreCharacters} 
        limitOfCharacters={limitOfCharacters}
        offsetOfCharacters={offsetOfCharacters}  
        setOffsetOfCharacters={setOffsetOfCharacters} />
      <Footer></Footer>
    </div>
  );
}

export default App;
