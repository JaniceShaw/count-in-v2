import React from 'react';
import { Buttons } from '../Buttons/buttons';
import { ChallengeFeedback } from './ChallengeFeedback/ChallengeFeedback';
import { Results } from '../results';

const ChallengeBlock = (props) => {

  if (props.finished === true) {
    return (
      <div className="challenge container">
        <div className="row">
          <div className="col-md-8">
            <h4>Time Challenge</h4>
            <p>Well done you got all the numbers correct.</p>

            <Results results={props.results} />
            <Buttons toShow={props.toShow} onClick={props.onClick} onClickClose={props.onClickClose} />
            <ChallengeFeedback incorrect={props.incorrect} />
          </div>

          <div className="col-md-4">
            <div className="timer finished">

              {props.timer}

            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="challenge container">
        <div className="row">
          <div className="col-md-8">
            <h4>Time Challenge</h4>
            <p>Get all the numbers correct in the quickest time.</p>
            <Buttons toShow={props.toShow} onClick={props.onClick} onClickClose={props.onClickClose} />
            <ChallengeFeedback incorrect={props.incorrect} />
          </div>

          <div className="col-md-4">
            <div className="timer">{props.timer}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default ChallengeBlock;
