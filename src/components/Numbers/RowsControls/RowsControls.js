import React from 'react';

export const RowsControls = (props) => {
    let style = '';
    let disabledPlus = false;
    let disabledMinus = false;
    const numEnd = props.numbersList.length;

    //check if quiz on disable buttons
    if (props.challengeStart) {
        style = 'hide';
        disabledMinus = true;
        disabledPlus = true;
    }

    // removes first array item // removes first 10 numbers
    if (props.numbersList[numEnd - 1][0] - props.numbersList[0][0] > 10) {
        disabledMinus = false;
    } else {
        disabledMinus = true;
    }

    return (
        <div className="RowsControls">
            {/* <span className={style}>rows</span> */}
            <button onClick={props.onClickMinMinus} disabled={disabledMinus} className={style}>-</button>
            <button onClick={props.onClickMinPlus} disabled={disabledPlus} className={style}>+</button>
        </div>
    );
}
