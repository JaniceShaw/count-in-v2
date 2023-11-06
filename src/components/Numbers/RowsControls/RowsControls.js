import React from 'react';
import Button from '../../UI/Button/Button';
import styles from './RowContols.module.css'

export const RowsControls = ({ numbersList, hideControls, onClickMinMinus, onClickMinPlus }) => {
    let style = '';
    let disabledPlus = false;
    let disabledMinus = false;
    const numEnd = numbersList.length;

    //check if quiz on disable buttons
    if (hideControls) {
        style = 'hide';
        disabledMinus = true;
        disabledPlus = true;
    }

    // removes first array item // removes first 10 numbers
    if (numbersList[numEnd - 1][0] - numbersList[0][0] > 10) {
        disabledMinus = false;
    } else {
        disabledMinus = true;
    }

    return (
        <div className={styles.RowsControls}>
            <span className={style}>Rows</span>
            <Button onClick={onClickMinMinus} disabled={disabledMinus} className={`${styles.control} ${style}`}>-</Button>
            <Button onClick={onClickMinPlus} disabled={disabledPlus} className={`${styles.control} ${style}`}>+</Button>
        </div>
    );
}
