import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchForm from './SearchForm'

describe('SearchForm component', () => {
  it('renders search form correctly', () => {
    // Render the component
    const { getByRole } = render(<SearchForm />)

    // Check if the search button is rendered correctly
    const searchButton = getByRole('button')
    expect(searchButton).toBeInTheDocument()
    expect(searchButton.firstChild.tagName.toLowerCase()).toBe('svg')
  })

  it('calls handleInputChange function when input value changes', () => {
    const handleInputChange = jest.fn() // Mock function

    const { getByPlaceholderText } = render(
      <SearchForm handleInputChange={handleInputChange} />
    )

    const inputElement = getByPlaceholderText('Name of character')

    // Simulate input change
    fireEvent.change(inputElement, { target: { value: 'Iron Man' } })

    // Check if handleInputChange function is called with the correct value
    expect(handleInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'Iron Man',
        }),
      })
    )
  })
})
