import React from 'react';
import Button from '../../UI/Button/Button';

export const RowsControls = ({ numbersList, challengeStart, onClickMinMinus, onClickMinPlus }) => {
    let style = '';
    let disabledPlus = false;
    let disabledMinus = false;
    const numEnd = numbersList.length;

    //check if quiz on disable buttons
    if (challengeStart) {
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
        <div className="RowsControls">
            <span className={style}>Rows</span>
            <Button onClick={onClickMinMinus} disabled={disabledMinus} className={style}>-</Button>
            <Button onClick={onClickMinPlus} disabled={disabledPlus} className={style}>+</Button>
        </div>
    );
}
