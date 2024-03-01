import React from 'react'
import styles from './SearchForm.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
      <h1>
        <label htmlFor='textInput'>Search your character</label>
      </h1>
      <form onSubmit={handleSubmit} data-testid='search-form'>
        <input
          type='text'
          id='textInput'
          name='textInput'
          placeholder='Name of character'
          value={textInput}
          onChange={handleInputChange}
          required
        />
        <button type='submit'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}

export default SearchForm
