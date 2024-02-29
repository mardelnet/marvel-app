import React, { useState } from 'react';
import { getSingleCharacter } from '../../utils/fetchData';

function SearchForm({ onSearch }) {
  const [textInput, setTextInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newCharacters = await getSingleCharacter(textInput);
      onSearch(newCharacters.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="textInput"
        name="textInput"
        placeholder="Enter text here"
        value={textInput}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SearchForm;
