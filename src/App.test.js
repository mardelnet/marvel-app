import { getSingleCharacter } from './utils/fetchData'
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

// Mock fetchData module
jest.mock('./utils/fetchData.ts', () => ({
  getCharacters: jest.fn(),
  getSingleCharacter: jest.fn(),
}))

describe('App Component', () => {
  it('renders loader when isLoading is true', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('loader')).toBeInTheDocument()
  })

  it('calls getMarvelCharacters with search=true on form submission', async () => {
    const { getByTestId, getByLabelText } = render(<App />)
    const input = getByLabelText('Search your character')

    fireEvent.change(input, { target: { value: 'Spider-Man' } })
    fireEvent.submit(getByTestId('search-form'))

    await waitFor(() => {
      expect(getSingleCharacter).toHaveBeenCalledWith('Spider-Man')
    })
  })
})
