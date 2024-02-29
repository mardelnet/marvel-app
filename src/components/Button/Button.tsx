import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  buttonLabel: string;
  icon?: string;
  link?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonLabel, icon, onClick }) => {
  return (
    <button className='button' onClick={onClick}>
      {buttonLabel}
      {icon && (
        <img className={styles['button__icon']} src={icon} alt={buttonLabel} />
      )}
    </button>
  );
};

export default Button;
