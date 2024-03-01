import React from 'react'
import { render } from '@testing-library/react'
import Footer from './Footer'

describe('Footer component', () => {
  it('renders footer information correctly', () => {
    const { getByText } = render(<Footer />)

    // Check if the footer text contains "Data provided by Marvel" and the current year
    const currentYear = new Date().getFullYear()
    expect(
      getByText('Data provided by Marvel. © ' + currentYear + ' MARVEL')
    ).toBeInTheDocument()
  })
})
