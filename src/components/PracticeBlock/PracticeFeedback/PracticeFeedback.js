import React from 'react';

function T1(props) {
  if (Number(props.correct) !== 0) { //TODO: need to change as number can be 0
    return (
      <span>
        <strong>Correct:</strong>
      </span>
    );
  } else {
    return (
      null
    )
  }
};

function T2(props) {
  if (Number(props.incorrect) !== 0) {
    return (
      <span>
        <strong>Incorrect:</strong>
      </span>
    );
  } else {
    return (
      null
    )
  }
};

export const PracticeFeedback = (props) => {
  var correct = props.correct;
  var incorrect = props.incorrect;

  return (
    <div className="practice-feedback">

      <T1 correct={props.correct} />
      <ul className="practice-feedback-correct">
        {correct.map((correct, index) => <li key={index}>{correct}</li>)}
      </ul>
      <T2 incorrect={incorrect} />
      <ul className="practice-feedback-incorrect">
        {incorrect.map((incorrect, index) => <li key={index}>{incorrect}</li>)}
      </ul>
    </div>
  );
}
