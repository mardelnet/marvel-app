import styles from './Button.module.scss';

function Button({ buttonLabel, icon, onClick }) {

  return (
    <button className='button' onClick={onClick}>
      {buttonLabel}
      {icon && (
        <img className={styles['button__icon']} src={icon} alt={buttonLabel} />
      )}
    </button>
  );
}

export default Button;
