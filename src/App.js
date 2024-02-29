// App.js
import React, { useState } from 'react';
import Characters from './components/Characters/Characters';
import Footer from './components/Footer/Footer';
import SearchForm from './components/SearchForm/SearchForm';
import LoadMore from './components/LoadMore/LoadMore';

function App() {
  const limitOfCharacters = 6;
  const [characters, setCharacters] = useState([]);
  const [offsetOfCharacters, setOffsetOfCharacters] = useState(0);

  const handleSearch = (searchResults) => {
    setCharacters(searchResults);
    setOffsetOfCharacters(0); // Reset offset for search results
  };
  
  const loadInitialCharacters = (searchResults) => {
    setCharacters(searchResults);
  };
  
  const loadMoreCharacters = (searchResults) => {
    setCharacters(prevCharacters => [...prevCharacters, ...searchResults]);
  };

  return (
    <div className='container'>
      <SearchForm onSearch={handleSearch} />
      <Characters
        onLoadMore={loadInitialCharacters} 
        limitOfCharacters={limitOfCharacters}
        offsetOfCharacters={offsetOfCharacters}  
        setOffsetOfCharacters={setOffsetOfCharacters}
        characters={characters} />
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
