import React from 'react';
import styles from './PracticeFeedback.module.css';

// function T1(props) {
//   if (Number(props.correct) !== 0) { //TODO: need to change as number can be 0
//     return (
//       <span>
//         <strong>Correct:</strong>
//       </span>
//     );
//   } else {
//     return (
//       null
//     )
//   }
// };

// function T2(props) {
//   console.log('inT2');
//   console.log(props.incorrect)
//   if (Number(props.incorrect) !== 0) {
//     return (
//       <span>
//         <strong>Incorrect:</strong>
//       </span>
//     );
//   } else {
//     return (
//       null
//     )
//   }
// };

export const PracticeFeedback = ({ correct, incorrect }) => {
  // console.log('hello in feedback', correct, incorrect)

  return (
    <div className={styles['practice-feedback']}>

      <strong>Correct</strong>
      <ul className={styles['practice-feedback-correct']}>
        {correct.map((number, index) => <li key={index}>{number}</li>)}
      </ul>

      {/* <T2 incorrect={incorrect} /> */}
      <strong>Incorrect:</strong>
      <ul className="practice-feedback-incorrect">
        {incorrect.map((number, index) => <li key={index}>{number}</li>)}
      </ul>
    </div>
  );
}
