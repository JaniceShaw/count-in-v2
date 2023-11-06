import React from 'react';
import Button from '../../UI/Button/Button';
import styles from './MaxControls.module.css'
//import '../Numbers.scss';
//import '../numbersDisplay.scss';

export const MaxControls = ({ onClickMaxMinus, onClickMaxPlus, hideControls, numbersList }) => {
    let style = '';
    let disabledMinus = false;
    let disabledPlus = false;
    // let hide = true;
    if (numbersList[0][0] > 1) {

        disabledMinus = false;
    } else {
        disabledMinus = true;
    }
    //check if quiz on disable buttons
    if (hideControls) {
        style = 'hide';
        //      let disabledMinus = true;
        //    let disabledPlus = true;
    }


    return (
        <div className={styles.MaxControls}>
            <span className={style}>Start Number</span>
            <Button onClick={onClickMaxMinus} disabled={disabledMinus} className={`${styles.control} ${style}`}>-</Button>
            <Button onClick={onClickMaxPlus} disabled={disabledPlus} className={`${styles.control} ${style}`}>+</Button>
        </div>

    );
}
