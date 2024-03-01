import React from 'react'
import classNames from 'classnames'
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
   * Optional icon for the button.
   */
  icon?: React.ReactNode

  /**
   * Function to handle button click event.
   */
  onClick?: () => void

  /**
   * Whether the button colors are inverted.
   */
  inverted?: boolean

  /**
   * Whether to open the link in a new tab.
   */
  openInNewTab?: boolean

  /**
   * The URL of the link. Required if openInNewTab is true.
   */
  href?: string
}

/**
 * Button component.
 * Represents a button element with optional icon.
 * @param {ButtonProps} props - Props for the Button component.
 * @returns {JSX.Element} - Rendered Button component.
 */
function Button({
  buttonLabel,
  icon,
  onClick,
  inverted,
  openInNewTab,
  href,
}: ButtonProps) {
  const buttonClasses = classNames(styles.button, {
    [styles.inverted]: inverted,
  })

  /**
   * Handles the click event of the button or anchor element.
   * If openInNewTab is true and href is provided, it opens the link in a new tab.
   * Otherwise, it executes the onClick handler if provided.
   * @param {React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>} event - The click event.
   */
  const handleClick = () => {
    if (openInNewTab && href) {
      window.open(href, '_blank')
    } else if (onClick) {
      onClick()
    }
  }

  const ButtonElement = href ? 'a' : 'button'

  return (
    <ButtonElement
      className={buttonClasses}
      onClick={handleClick}
      href={href}
      target={openInNewTab ? '_blank' : undefined}
    >
      {buttonLabel}
      {icon && icon}
    </ButtonElement>
  )
}

export default Button
