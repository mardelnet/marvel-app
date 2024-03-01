import React from 'react'
import styles from './SearchForm.module.scss'
import MySVG from './icon_search.svg'

interface SearchFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  textInput: string
}

const SearchForm: React.FC<SearchFormProps> = ({
  handleSubmit,
  handleInputChange,
  textInput,
}) => {
  return (
    <div className={styles.searchform}>
      <h1>Search your character</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='textInput'
          name='textInput'
          placeholder='Enter text here'
          value={textInput}
          onChange={handleInputChange}
          required
        />
        <button type='submit'>
          <img src={MySVG} alt='Description of SVG' />
        </button>
      </form>
    </div>
  )
}

export default SearchForm
