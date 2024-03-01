import React from 'react'

/**
 * Footer component.
 * Displays footer information.
 * @returns {JSX.Element} - Rendered Footer component.
 */
const Footer: React.FC = () => {
  return (
    <div>Data provided by Marvel. &copy; {new Date().getFullYear()} MARVEL</div>
  )
}

export default Footer
