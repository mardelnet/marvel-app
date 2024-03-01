import React from 'react'
import styles from './Loader.module.scss'

/**
 * Loader component.
 * Displays a loading spinner.
 * @returns {JSX.Element} - Rendered Loader component.
 */
const Loader: React.FC = () => {
  return (
    <div className={styles['loader-container']} data-testid='loader'>
      <div className={styles['loader-container__loader']}></div>
    </div>
  )
}

export default Loader
