import React from 'react';
import styles from './PracticeFeedback.module.css';

export const PracticeFeedback = ({ correct, incorrect }) => {

  return (
    <div className={styles['practice-feedback']}>

      <strong>Correct</strong>
      <ul className={styles['practice-feedback-correct']}>
        {correct.map((number, index) => <li key={index}>{number}</li>)}
      </ul>

      <strong>Incorrect</strong>
      <ul className="practice-feedback-incorrect">
        {incorrect.map((number, index) => <li key={index}>{number}</li>)}
      </ul>
    </div>
  );
}
