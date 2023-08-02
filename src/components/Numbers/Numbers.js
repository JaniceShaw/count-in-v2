import React from 'react';
import { RowsControls } from './RowsControls/RowsControls';
import { MaxControls } from './MaxControls/MaxControls';
import { NumbersDisplay } from './NumbersDisplay/numbersDisplay';
import './Numbers.scss';
//import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Numbers = ({ hideControls, onClickMinMinus, onClickMinPlus, onNumClick, numClass, onClickMaxMinus, onClickMaxPlus, theNum }) => {
    //let theNum = props.theNum;

    return (
        <div className='Numbers container'>
            <RowsControls
                onClickMinMinus={onClickMinMinus}
                onClickMinPlus={onClickMinPlus}
                numbersList={theNum}
                // challengeStart={challengeStart}
                hideControls={hideControls}
            />

            <NumbersDisplay
                theNum={theNum}
                onNumClick={onNumClick}
                numClass={numClass}
            />

            <MaxControls
                onClickMaxMinus={onClickMaxMinus}
                onClickMaxPlus={onClickMaxPlus}
                numbersList={theNum}
                // challengeStart={challengeStart}
                hideControls={hideControls}
            />
        </div>
    );
}
export default Numbers