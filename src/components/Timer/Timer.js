import { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import styles from './Timer.module.css'

const Timer = ({ isRunning }) => {
    console.log('in timer');

    const [running, setRunning] = useState(isRunning);
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

    const onStartStopHandler = () => {
        setRunning((prevState) => !prevState);
        if (!running) {
            setPreviousTime(Date.now());
        }
    }

    const onResetHandler = () => {
        setElapsedTime(0);
        setPreviousTime(0);
        setRunning(false)
    }

    return (
        <>
            <Button onClick={onStartStopHandler}>{!running ? 'Start' : 'Stop'}</Button>
            <Button onClick={onResetHandler}>Reset</Button>

            <div className={styles.timer}> Timer: {theTime}</div>
        </>
    )
}

export default Timer;


// starts challenge,
// if (this.state.challenge !== true) {
//     this.setState({
//         rand: rand,
//         challenge: true,
//         finished: false,
//         incorrectQ: [],
//         elapsedTime: 0,
//         running: true,
//         previousTime: Date.now(),
//         numbersList: theNewNum
//     });
//     speakDe(rand, lang);

//     // stops challenge, resets incorrectAdd arrays
// } else {
//     if (e.currentTarget.textContent === "Stop") {
//         this.setState({ challenge: false, running: false });
//         incorrectAdd = [];
//         // replays number said
//     } else {
//         speakDe(this.state.rand, lang);
//     }
// }


//for timer
// componentDidMount() {
//     this.interval = setInterval(this.onTick, 100);
// }

// componentWillUnmount() {
//     clearInterval(this.interval);
// }

// onTick() {
//     if (this.state.running) {
//         var now = Date.now();
//         this.setState({
//             previousTime: now,
//             elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
//         })
//     }
// }