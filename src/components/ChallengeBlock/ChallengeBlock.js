import React from 'react';
import { useState, useEffect } from 'react';
import { Buttons } from '../Buttons/buttons';
import { ChallengeFeedback } from './ChallengeFeedback/ChallengeFeedback';
import { Results } from '../results';
import styles from './ChallengeBlock.module.css';
// import Timer from '../Timer/Timer';

const ChallengeBlock = ({ toShow, onClick, incorrect, finished, results, onClickClose }) => {

  console.log('CB-incorrect test', incorrect)

  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);

  useEffect(() => {

    const onTick = () => {
      // console.log('ontick', running);
      if (running) {
        let now = Date.now();
        setPreviousTime(now);
        setElapsedTime((prevState) => prevState + (now - previousTime));
      }
    }

    const interval = setInterval(() => {
      console.log('this will run every 10th second');
      onTick();
    }, 100);

    return () => clearInterval(interval);

  }, [running, previousTime]);

  // for the display of the timer - formating
  let timer = Math.floor(elapsedTime);
  let mins = Math.floor(timer / 60000);
  let secs = ((timer % 60000) / 1000).toFixed(0);
  let theTime = (secs === 60 ? (mins + 1) + ":00" : mins + ":" + (secs < 10 ? "0" : "") + secs);

  const startStopHandler = () => {
    setRunning((prevState) => !prevState);
    if (!running) {
      setPreviousTime(Date.now());
      onClick();
    } else {

    }
  }

  const resetHandler = () => {
    setElapsedTime(0);
    setPreviousTime(0);
    setRunning(false)
  }


  if (finished === true) {
    return (
      <div className={`${styles.challenge} container`}>

        <div className="col-md-8">
          <h4>Time Challenge</h4>
          <p>Well done you got all the numbers correct.</p>

          <Results results={results} />
          <Buttons toShow={toShow} onClick={onClick} onClickClose={onClickClose} />
          <ChallengeFeedback incorrect={incorrect} />
        </div>

        <div className="col-md-4">
          <div className="timer finished">

            {/* {timer} */}

          </div>
        </div>

      </div>
    )
  } else {
    return (
      <div className={`${styles.challenge} container`}>

        <h4>Time Challenge</h4>
        <p>Get all the numbers correct in the quickest time.</p>

        <Buttons toShow={toShow} onClick={startStopHandler} onClickClose={onClickClose} />

        <div className={styles.timer}> Timer: {theTime}</div>
        <ChallengeFeedback incorrect={incorrect} />

        {/* <div className="timer">{timer}</div> */}
        {/* <Timer isRunning={false} /> */}

      </div>
    );
  }
}
export default ChallengeBlock;
