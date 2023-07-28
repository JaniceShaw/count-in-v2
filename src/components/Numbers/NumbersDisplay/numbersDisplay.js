import React from 'react';
import './numbersDisplay.scss';
// import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export const NumbersDisplay = ({ theNum, onNumClick, numClass }) => {

  //console.log('thenum', theNum);

  return (

    <ul className="numbers-display">
      {theNum.map((theNum, index) => <li className={theNum[1]} key={index} onClick={onNumClick}>
        {theNum[0]}
      </li>)}
    </ul>

  );
}
