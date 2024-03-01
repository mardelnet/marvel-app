import React from 'react';
import { render } from '@testing-library/react';
import SingleCharacter from './SingleCharacter';

describe('SingleCharacter component', () => {
  const characterProps = {
    name: 'Iron Man',
    imageUrl: 'https://example.com/ironman.jpg',
    description: 'Genius, billionaire, playboy, philanthropist.',
    extraInfoLink: 'https://example.com/ironman',
  };

  it('renders character information correctly', () => {
    const { getByText, getByAltText, getByTestId } = render(<SingleCharacter {...characterProps} />);
    
    // Check if character name, description, and image are rendered correctly
    expect(getByText('Iron Man')).toBeInTheDocument();
    expect(getByText('Genius, billionaire, playboy, philanthropist.')).toBeInTheDocument();
    expect(getByAltText('Iron Man')).toHaveAttribute('src', 'https://example.com/ironman.jpg');

    // Check if the "Read more" button is rendered correctly
    expect(getByText('Read more')).toBeInTheDocument();
    expect(getByTestId('read-more-button')).toHaveAttribute('href', 'https://example.com/ironman');
  });

  it('renders "(No description available)" if description is not provided', () => {
    const propsWithoutDescription = { ...characterProps, description: undefined };
    const { getByText } = render(<SingleCharacter {...propsWithoutDescription} />);
    expect(getByText('(No description available)')).toBeInTheDocument();
  });

  it('truncates description if it exceeds 101 characters', () => {
    const longDescription = 'This is a very long description that exceeds 101 characters and should be truncated.';
    const propsWithLongDescription = { ...characterProps, description: longDescription };
    const { getByText } = render(<SingleCharacter {...propsWithLongDescription} />);
    expect(getByText('This is a very long description that exceeds 101 characters and should be truncated...')).toBeInTheDocument();
  });
});
