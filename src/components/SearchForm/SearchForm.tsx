import React from 'react'
import styles from './SearchForm.module.scss'
import MySVG from './icon_search.svg'

/**
 * Props interface for the SearchForm component.
 */
interface SearchFormProps {
  /**
   * Function to handle form submission.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void

  /**
   * Function to handle input change.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void

  /**
   * The value of the text input field.
   */
  textInput: string
}

/**
 * SearchForm component.
 * @param {SearchFormProps} props - Props for the SearchForm component.
 * @returns {JSX.Element} - Rendered SearchForm component.
 */
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
