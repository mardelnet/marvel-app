import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { getCharacters, getSingleCharacter } from './utils/fetchData';

jest.mock('./utils/fetchData');

describe('App component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders App component correctly', async () => {
    getCharacters.mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, name: 'Iron Man', description: 'Genius, billionaire, playboy, philanthropist.', urls: [{ url: 'https://example.com/ironman' }], thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' } },
          { id: 2, name: 'Captain America', description: 'Super soldier and leader of the Avengers.', urls: [{ url: 'https://example.com/captainamerica' }], thumbnail: { path: 'https://example.com/captainamerica', extension: 'jpg' } }
        ]
      }
    });

    const { getByText, getByPlaceholderText } = render(<App />);
    
    // Check if the loader is rendered initially
    expect(getByText('Loading...')).toBeInTheDocument();
    
    // Wait for characters to load
    await waitFor(() => {
      // Check if the search form, characters, load more button, and footer are rendered
      expect(getByPlaceholderText('Name of character')).toBeInTheDocument();
      expect(getByText('Iron Man')).toBeInTheDocument();
      expect(getByText('Captain America')).toBeInTheDocument();
      expect(getByText('Load More')).toBeInTheDocument();
      expect(getByText('Data provided by Marvel. © 2024 MARVEL')).toBeInTheDocument();
    });
  });

  it('fetches characters when component mounts', async () => {
    getCharacters.mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, name: 'Iron Man', description: 'Genius, billionaire, playboy, philanthropist.', urls: [{ url: 'https://example.com/ironman' }], thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' } },
          { id: 2, name: 'Captain America', description: 'Super soldier and leader of the Avengers.', urls: [{ url: 'https://example.com/captainamerica' }], thumbnail: { path: 'https://example.com/captainamerica', extension: 'jpg' } }
        ]
      }
    });

    render(<App />);

    // Check if getCharacters is called once
    expect(getCharacters).toHaveBeenCalledTimes(1);
    expect(getCharacters).toHaveBeenCalledWith(6, 0);
  });

  it('fetches characters when "Load More" button is clicked', async () => {
    getCharacters.mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, name: 'Iron Man', description: 'Genius, billionaire, playboy, philanthropist.', urls: [{ url: 'https://example.com/ironman' }], thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' } },
          { id: 2, name: 'Captain America', description: 'Super soldier and leader of the Avengers.', urls: [{ url: 'https://example.com/captainamerica' }], thumbnail: { path: 'https://example.com/captainamerica', extension: 'jpg' } }
        ]
      }
    });

    const { getByText } = render(<App />);

    // Click on the "Load More" button
    fireEvent.click(getByText('Load More'));

    // Check if getCharacters is called with the correct offset
    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith(6, 6);
    });
  });

  it('fetches characters when form is submitted', async () => {
    getSingleCharacter.mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, name: 'Iron Man', description: 'Genius, billionaire, playboy, philanthropist.', urls: [{ url: 'https://example.com/ironman' }], thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' } }
        ]
      }
    });

    const { getByPlaceholderText, getByText } = render(<App />);

    // Enter character name in the search form
    fireEvent.change(getByPlaceholderText('Name of character'), { target: { value: 'Iron Man' } });

    // Submit the form
    fireEvent.submit(getByText(''));

    // Check if getSingleCharacter is called with the correct name
    await waitFor(() => {
      expect(getSingleCharacter).toHaveBeenCalledWith('Iron Man');
    });
  });
});
