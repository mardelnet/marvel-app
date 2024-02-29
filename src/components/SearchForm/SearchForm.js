import React, { useState } from 'react';
import { getSingleCharacter } from '../../utils/fetchData';
import styles from './SearchForm.module.scss';
import MySVG from './icon_search.svg';

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
    <div className={styles.searchform}>
        <h1>Search your character</h1>
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
          <button type="submit">
            <img src={MySVG} alt="Description of SVG" />
          </button>
      </form>
    </div>
  );
}

export default SearchForm;
