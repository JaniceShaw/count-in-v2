// import './Learn.scss';
import React from 'react';
import { NumbersDisplay } from '../NumbersDisplay/numbersDisplay'

const Learn = (props) => {
    const theNum = props.learnList;
    console.log('learn: ', theNum)
    return (

        <div className='Learn'>

            <ul>
                {theNum.map((theNum, index) => <li className={theNum[1]} key={index} onClick={props.onClick}>
                    {theNum[0]}
                </li>)}
            </ul>
        </div>
    )
}

export default Learn;