import React from 'react';

import '../Numbers.scss';
//import '../numbersDisplay.scss';

export const MaxControls = (props) => {
    let style = '';
    let disabledMinus = false;
    let disabledPlus = false;
    // let hide = true;
    if (props.numbersList[0][0] > 1) {

        disabledMinus = false;
    } else {
        disabledMinus = true;
    }
    //check if quiz on disable buttons
    if (props.challengeStart) {
        style = 'hide';
        //      let disabledMinus = true;
        //    let disabledPlus = true;
    }


    return (
        <div className="MaxControls">
            <span className={style}>Start number</span>
            <button onClick={props.onClickMaxMinus} disabled={disabledMinus} className={style}>-</button>
            <button onClick={props.onClickMaxPlus} className={style} disabled={disabledPlus} >+</button>
        </div>

    );
}
