import React from 'react';
import Button from '../UI/Button/Button';
import styles from './buttons.module.css';

export const Buttons = ({ toShow, onClick, onClickClose }) => {
  if (toShow === true) {
    return (
      <div>
        <Button type='button' className={styles.stop} onClick={onClick}>Stop</Button>
        <Button type='button' className={styles.repeat} onClick={onClick}>Repeat</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button type='button' className={styles.play} onClick={onClick}>Play</Button>
        <Button type='button' className={styles.close} onClick={() => onClickClose('learn')}>Close</Button>
      </div>

    )
  }
}
