import React from 'react'
import styles from './Button.module.scss'

/**
 * Props interface for the Button component.
 */
interface ButtonProps {
  /**
   * The label text for the button.
   */
  buttonLabel: string

  /**
   * Optional icon URL for the button.
   */
  icon?: string

  /**
   * Function to handle button click event.
   */
  onClick?: () => void
}

/**
 * Button component.
 * Represents a button element with optional icon.
 * @param {ButtonProps} props - Props for the Button component.
 * @returns {JSX.Element} - Rendered Button component.
 */
function Button({ buttonLabel, icon, onClick }: ButtonProps) {
  return (
    <button className='button' onClick={onClick}>
      {buttonLabel}
      {icon && (
        <img className={styles['button__icon']} src={icon} alt={buttonLabel} />
      )}
    </button>
  )
}

export default Button
