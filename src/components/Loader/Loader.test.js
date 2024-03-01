import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  it('renders loader component correctly', () => {
    const { container } = render(<Loader />);
    
    // Check if the loader container and loader element are rendered
    const loaderContainer = container.querySelector('.loader-container');
    const loaderElement = container.querySelector('.loader-container__loader');
    
    expect(loaderContainer).toBeInTheDocument();
    expect(loaderElement).toBeInTheDocument();
  });
});
