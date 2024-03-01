import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button component', () => {
  it('renders a button element with label', () => {
    const { getByText } = render(<Button buttonLabel='Click me' />)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('renders a button element with icon', () => {
    const { getByTestId } = render(
      <Button buttonLabel='Click me' icon={<span data-testid='icon' />} />
    )
    expect(getByTestId('icon')).toBeInTheDocument()
  })

  it('executes onClick handler when clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button buttonLabel='Click me' onClick={handleClick} />
    )
    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('opens link in new tab when openInNewTab is true', () => {
    const { getByText } = render(
      <Button
        buttonLabel='Open link'
        href='https://example.com'
        openInNewTab={true}
      />
    )
    const link = getByText('Open link')
    expect(link.getAttribute('target')).toBe('_blank')
  })

  it('does not open link in new tab when openInNewTab is false', () => {
    const { getByText } = render(
      <Button
        buttonLabel='Open link'
        href='https://example.com'
        openInNewTab={false}
      />
    )
    const link = getByText('Open link')
    expect(link.getAttribute('target')).toBeNull()
  })

  it('handles click event correctly without openInNewTab', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button buttonLabel='Click me' onClick={handleClick} />
    )
    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalled()
  })
})
