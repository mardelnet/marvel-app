import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm component', () => {
  it('renders search form correctly', () => {
    const handleSubmit = jest.fn();
    const handleInputChange = jest.fn();
    const textInput = 'Iron Man';

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <SearchForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        textInput={textInput}
      />
    );

    // Check if the heading and input fields are rendered correctly
    expect(getByText('Search your character')).toBeInTheDocument();
    expect(getByPlaceholderText('Name of character')).toBeInTheDocument();
    expect(getByDisplayValue('Iron Man')).toBeInTheDocument();

    // Check if the search button is rendered correctly
    const searchButton = getByText('');
    expect(searchButton).toBeInTheDocument();
    expect(searchButton.firstChild.tagName.toLowerCase()).toBe('svg');
  });

  it('calls handleSubmit function when form is submitted', () => {
    const handleSubmit = jest.fn();
    const handleInputChange = jest.fn();
    const textInput = 'Iron Man';

    const { getByRole } = render(
      <SearchForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        textInput={textInput}
      />
    );

    // Simulate form submission
    fireEvent.submit(getByRole('form'));

    // Check if handleSubmit function is called
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('calls handleInputChange function when input value changes', () => {
    const handleSubmit = jest.fn();
    const handleInputChange = jest.fn();
    const textInput = '';

    const { getByPlaceholderText } = render(
      <SearchForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        textInput={textInput}
      />
    );

    // Simulate input change
    fireEvent.change(getByPlaceholderText('Name of character'), {
      target: { value: 'Iron Man' },
    });

    // Check if handleInputChange function is called with the correct value
    expect(handleInputChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'Iron Man',
      }),
    }));
  });
});
