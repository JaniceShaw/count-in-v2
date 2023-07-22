import React from 'react';
import { Buttons } from '../Buttons/buttons';
import { PracticeFeedback } from './PracticeFeedback/PracticeFeedback';

export const PracticeBlock = (props) => {
  return (
    <div className="practice container">
      <h4>Practice</h4>
      <p>Practice numbers by clicking the number above that was said.</p>

      <Buttons toShow={props.toShow} onClick={props.onClick} />

      <PracticeFeedback correct={props.correct} incorrect={props.incorrect} />

    </div>
  );
}
