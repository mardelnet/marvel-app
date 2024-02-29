import React from 'react'
import styles from './Loader.module.scss'

function Loader() {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['loader-container__loader']}></div>
    </div>
  )
}

export default Loader