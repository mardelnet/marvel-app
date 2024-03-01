import React from 'react'
import styles from './Footer.module.scss'

/**
 * Footer component.
 * Displays footer information.
 * @returns {JSX.Element} - Rendered Footer component.
 */
const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      Data provided by Marvel. &copy; {new Date().getFullYear()} MARVEL
    </div>
  )
}

export default Footer
