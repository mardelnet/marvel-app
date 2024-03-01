import React from 'react';
import { render } from '@testing-library/react';
import Characters from './Characters';

describe('Characters component', () => {
  it('renders characters list correctly', () => {
    const characters = [
      {
        id: 1,
        name: 'Iron Man',
        description: 'Genius, billionaire, playboy, philanthropist.',
        urls: [{ url: 'https://example.com/ironman' }],
        thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' },
      },
      {
        id: 2,
        name: 'Captain America',
        description: 'Super soldier and leader of the Avengers.',
        urls: [{ url: 'https://example.com/captainamerica' }],
        thumbnail: { path: 'https://example.com/captainamerica', extension: 'jpg' },
      },
    ];

    const { getByText, getAllByTestId } = render(<Characters characters={characters} />);
    
    // Check if each character name and description is rendered
    expect(getByText('Iron Man')).toBeInTheDocument();
    expect(getByText('Genius, billionaire, playboy, philanthropist.')).toBeInTheDocument();
    expect(getByText('Captain America')).toBeInTheDocument();
    expect(getByText('Super soldier and leader of the Avengers.')).toBeInTheDocument();

    // Check if each character's image is rendered
    const characterImages = getAllByTestId('character-image');
    expect(characterImages).toHaveLength(2);
    expect(characterImages[0]).toHaveAttribute('src', 'https://example.com/ironman.jpg');
    expect(characterImages[1]).toHaveAttribute('src', 'https://example.com/captainamerica.jpg');

    // Check if each character's link is rendered correctly
    const characterLinks = getAllByTestId('character-link');
    expect(characterLinks).toHaveLength(2);
  });

  it('renders null if characters array is empty', () => {
    const { container } = render(<Characters characters={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
