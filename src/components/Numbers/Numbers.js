import React from 'react';
import { RowsControls } from './RowsControls/RowsControls';
import { MaxControls } from './MaxControls/MaxControls';
import { NumbersDisplay } from './NumbersDisplay/numbersDisplay';
import './Numbers.scss';
//import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export const Numbers = (props) => {
    //let theNum = props.theNum;

    return (
        <div className='Numbers'>
            <RowsControls
                onClickMinMinus={props.onClickMinMinus}
                onClickMinPlus={props.onClickMinPlus}
                numbersList={props.theNum}
                challengeStart={props.challengeStart}
            />

            <NumbersDisplay
                theNum={props.theNum}
                onNumClick={props.onNumClick}
                numClass={props.numClass}
            />

            <MaxControls
                onClickMaxMinus={props.onClickMaxMinus}
                onClickMaxPlus={props.onClickMaxPlus}
                numbersList={props.theNum}
                challengeStart={props.challengeStart}
            />
        </div>
    );
}
