import React from 'react'
import { render } from '@testing-library/react'
import SingleCharacter from './SingleCharacter'

describe('SingleCharacter component', () => {
  const characterProps = {
    name: 'Iron Man',
    imageUrl: 'https://example.com/ironman.jpg',
    description: 'Genius, billionaire, playboy, philanthropist.',
    extraInfoLink: 'https://example.com/ironman',
  }

  it('renders character information correctly', () => {
    const { getByText, getByAltText } = render(
      <SingleCharacter {...characterProps} />
    )

    // Check if character name, description, image and button are rendered correctly
    expect(getByText('Iron Man')).toBeInTheDocument()
    expect(
      getByText('Genius, billionaire, playboy, philanthropist.')
    ).toBeInTheDocument()
    expect(getByAltText('Iron Man')).toHaveAttribute(
      'src',
      'https://example.com/ironman.jpg'
    )
    expect(getByText('Read more')).toBeInTheDocument()
  })

  it('renders "(No description available)" if description is not provided', () => {
    const propsWithoutDescription = {
      ...characterProps,
      description: undefined,
    }
    const { getByText } = render(
      <SingleCharacter {...propsWithoutDescription} />
    )
    expect(getByText('(No description available)')).toBeInTheDocument()
  })
})
