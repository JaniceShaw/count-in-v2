import React from 'react';
import { Buttons } from '../Buttons/buttons';
import { PracticeFeedback } from './PracticeFeedback/PracticeFeedback';

import styles from './PracticeBlock.module.css';

const PracticeBlock = ({ toShow, onClick, onClickClose, correct, incorrect }) => {
  return (
    <div className={styles.practice + " container"}>
      <h4>Practice</h4>
      <p>Practice numbers by clicking the number above that was said.</p>

      <Buttons toShow={toShow} onClick={onClick} onClickClose={onClickClose} />

      {(correct.length > 0 || incorrect.length > 0) && <PracticeFeedback correct={correct} incorrect={incorrect} />}

    </div>
  );
}
export default PracticeBlock;
