import React from 'react';
import './numbersDisplay.scss';
// import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export const NumbersDisplay = ({ theNum, onNumClick, numClass }) => {

  //console.log('thenum', theNum);

  return (

    // <ReactCSSTransitionGroup
    //   component="ul"
    //   transitionName="sn"
    //   className="numbers-display"
    //   transitionEnterTimeout={600}
    //   transitionLeaveTimeout={600}
    //   transitionAppear={true}
    //   transitionAppearTimeout={600}
    // >
    <ul className="numbers-display">
      {theNum.map((theNum, index) => <li className={theNum[1]} key={index} onClick={onNumClick}>
        {theNum[0]}
      </li>)}
    </ul>

    // </ReactCSSTransitionGroup>

  );
}
