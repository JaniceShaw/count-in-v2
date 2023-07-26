import { useState, useEffect } from 'react';

import './App.scss';

import Menu from './components/menu/Menu';

import { Header } from './components/Header/header';
import { Numbers } from './components/Numbers/Numbers';
import { PracticeBlock } from './components/PracticeBlock/PracticeBlock';
import { ChallengeBlock } from './components/ChallengeBlock/ChallengeBlock';

import Learn from './components/Numbers/Learn/Learn';


// global arrays
let correctAdd = [];
let incorrectAdd = [];
let resultAdd = [];
//let theNum = [];
let i;
// console.log('numberlist', numbersList);

const languageList = [
  ['Chinese', 'zh-CN', '中文', '不正确'],
  ['Dutch', 'nl-NL', 'Nederlands', 'onjuist'],
  ['English (GB)', 'en-GB', 'English', 'incorrect'],
  ['English (US)', 'en-US', 'English', 'incorrect'],
  ['French', 'fr-FR', 'français', 'incorrect'],
  ['French (CA)', 'fr-CA', 'français', 'incorrect'],
  ['German', 'de-DE', 'deutsch', 'falsch'],
  // ['German (CH)', 'de-CH', 'deutsch', 'falsch'],
  ['Hebrew', 'he-IL', 'עִברִית', 'לֹא נָכוֹן'],
  ['Italian', 'it-IT', 'italiano', 'scorretto'],
  ['Japanese', 'ja-JP', '日本語', '間違った'],
  ['Korean', 'ko-KR', '한국어', '부정확 한'],
  ['Polish', 'pl-PL', 'Polskie', 'błędny'],
  ['Portuguese', 'pt-PT', 'Português', 'incorreta'],
  ['Portuguese (BR)', 'pt-BR', 'Português', 'incorreta'],
  ['Russian', 'ru-RU', 'русский', 'некорректный'],
  ['Spanish', 'es-ES', 'Español', 'incorrecto'],
  ['Spanish (MX)', 'es-MX', 'Español', 'incorrecto'],
  ['Swedish', 'sv-SE', 'svenska', 'felaktig'],
  ['Thai', 'th-TH', 'ไทย', 'ไม่ถูกต้อง']
];

// function runSpeakAll(say, lang) {
//   to_speak = new SpeechSynthesisUtterance(say);
//   to_speak.lang = lang;
//   to_speak.rate = 0.9;
//   speech.speak(to_speak)
// }

const App = () => {

  function defaultNumbersList() {
    let numberList = [];

    for (let j = 1; j <= 10; j++) {
      numberList.push([j, 'num']);
    }
    return numberList
  }


  //set up states -- not all need to be state 
  const [showLangs, setShowLangs] = useState(false); // hide lang list selection
  // do i need both of these??
  const [langSelected, setLangSelected] = useState(6); // The selected language (German default)
  const [lang, setLang] = useState("de-DE"); // is this not the same as above??
  const [germanVoice, setGermanVoice] = useState();
  //const [langs, setLangs] = useState(); // the array of languages to select -- TODO: maybe not needed
  const [learnList] = useState([[1, 'num']]);
  const [numbersList, setNumberList] = useState(defaultNumbersList);
  //const [test, setTest] = useState(false); // to show if practice has been clicked
  const [practice, setPractice] = useState(false); // to show if practice has been clicked


  // for Time challenge
  const [challenge, setChallenge] = useState(false); // sets challenge to not started
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);
  const [rand, setRand] = useState(''); // the random number said
  const [correct, setCorrect] = useState([]); // #endregion//array for correct answers
  const [incorrect, setIncorrect] = useState([]); // array for incorrect answers

  const [incorrectChallenge, setIncorrectChallenge] = useState([]);
  const [theTime, setTheTime] = useState();

  useEffect(() => {
    // console.log('in useeffect for get voice');
    let voicesAll = speechSynthesis.getVoices();

    // console.log(voicesAll);

    // need time out to work consistently in chrome
    setTimeout(() => {
      voicesAll = speechSynthesis.getVoices();
      //console.log('in tiem out', voicesAll);
      const vuris = [];
      const voices = [];

      //unfortunately we have to check for duplicates
      voicesAll.forEach(function (obj) {
        const uri = obj.voiceURI;
        //if voiceuri is not in obj.voiceuri then push to array vuris-- makes a list of unique voiceURI's 
        if (!vuris.includes(uri)) {

          vuris.push(uri);
          // get list of only german voices not including Anna (she is strange!)
          if (obj.lang === 'de-DE' && obj.name !== "Anna" && obj.name !== "Sandy") {
            voices.push(obj);
          }
        }
      });

      // console.log('get the voice', voices[0]);
      if (!voices[0]) {
        console.log('did not get the voices');
      }

      setGermanVoice(voices[0]);

    }, 250);
  }, []);

  // make speak
  const speech = window.speechSynthesis;
  let to_speak;

  function runSpeak(say, lang) {

    shutUp();

    to_speak = new SpeechSynthesisUtterance(say);
    to_speak.lang = lang;
    // default german voice anna not working need to change to an alternative german voice
    if (lang === 'de-DE') {
      to_speak.voice = germanVoice;
    }

    to_speak.rate = 0.9;
    speech.speak(to_speak)
  }

  function shutUp() {
    //console.log('did shut up');
    speech.cancel()
  }

  // open lang selector //
  const openLangsHandler = () => {
    if (!challenge) {
      setShowLangs(true)
    }
  }

  //select the newly clicked language
  const langClickedHandler = (newLangSelected) => {

    const newLang = languageList[newLangSelected][1];

    runSpeak(languageList[newLangSelected][2], newLang);
    setLang(newLang);
    setLangSelected(newLangSelected);
    setShowLangs(false)
  }

  // Numbers Changed //
  //Max minus -- start number  - --
  const maxMinusClickedHandler = () => {
    console.log('numbers -');

    let newNumbersList = [...numbersList];
    const startNum = newNumbersList[0][0];
    if (startNum > 1) {

      for (i = 1; i <= 10; i++) {
        newNumbersList.pop();
      }

      for (i = startNum - 1; i >= startNum - 10; i--) {
        newNumbersList.unshift([i, 'num']);
      }

      setNumberList((prevState) => {
        return (newNumbersList);
      })
    }
  }

  //Max plus -- start numer + ---
  const maxPlusClickedHandler = () => {

    let newNumbersList = [...numbersList];
    const numEnd = newNumbersList.length;
    const endNumber = newNumbersList[numEnd - 1][0];

    for (i = endNumber + 1; i < endNumber + 11; i++) {
      newNumbersList.push([i, 'num']);
    }

    for (i = 1; i <= 10; i++) {
      newNumbersList.shift();
    }

    setNumberList((prevState) => {
      return (newNumbersList);
    })

  }

  // Row minus
  const minMinusClickedHandler = () => {

    let newNumbersList = [...numbersList];
    const numEnd = newNumbersList[newNumbersList.length - 1][0] - 10;
    //remove last 10 items
    if (numEnd >= 10) {
      for (i = 1; i <= 10; i++) {
        newNumbersList.pop();
      }
      setNumberList((prevState) => {
        return (newNumbersList);
      })
    }
  }

  //Row plus
  const minPlusClickedHandler = () => {

    let newNumbersList = [...numbersList];
    console.log('1-newNumbersList', newNumbersList)

    const numStart = newNumbersList[newNumbersList.length - 1][0] + 1;

    console.log('numStart', numStart);

    for (let i = numStart; i < numStart + 10; i++) {
      newNumbersList.push([i, 'num']);
    }
    console.log('newnum', newNumbersList);

    setNumberList((prevState) => {
      return (newNumbersList);
    })

  };

  //number clicked
  const handleNumberClick = (e) => {

    const clicked = Number(e.target.textContent);

    // Check if practice mode is on //
    if (practice) {

      if (rand === clicked) {
        //console.log('got it right')
        const newRandomNumber = numbersList[Math.floor((Math.random() * numbersList.length))][0];
        setRand(newRandomNumber);
        runSpeak(newRandomNumber, lang);
        setCorrect((prevState => {
          return [...prevState, rand]
        }))
      } else {
        setIncorrect((prevState) => [...prevState, rand]);
      }
      return
    }

    // check if challenge mode is on
    if (challenge) {
      console.log("started chalange!")
      //correct number clicked
      if (rand === clicked) {
        console.log('Got it right!')
      }

      return
    }

    // let rand = numbersList[Math.floor((Math.random() * numbersList.length))][0];

    let theNum = [...numbersList];
    let theNewNum = [];
    let numClassC = 'num correct';

    // this.setState({ clicked: clicked });
    // console.log('clicked', clicked, lang);
    runSpeak(clicked, lang);


    //     //Challenge is correct
    //   } else if (clicked === this.state.rand && this.state.challenge) {

    //     //updates the displayed number class
    //     for (i = 0; i < theNum.length; i++) {

    //       if (clicked === theNum[i][0]) {

    //         theNewNum.push([theNum[i][0], numClassC]);

    //         this.setState({ numbersList: theNewNum });
    //       } else {
    //         theNewNum.push([theNum[i][0], theNum[i][1]]);
    //       }
    //     }

    //     //make an array of numbers that are not correct
    //     let forRand = [];
    //     for (i = 0; i < theNewNum.length; i++) {
    //       if (theNewNum[i][1] === "num") {
    //         forRand.push(theNewNum[i][0]);
    //       }
    //     }
    //     let rand2 = forRand[Math.floor((Math.random() * forRand.length))];

    //     this.setState({ rand: rand2, theNum: theNewNum });

    //     //checks to if finished
    //     if (forRand.length < 1) { //NOTE: change for testing
    //       let language = this.state.langs[this.state.langSelected][0];
    //       let numbers = this.state.from + ' - ' + this.state.to;
    //       let timer = Math.floor(this.state.elapsedTime);
    //       let mins = Math.floor(timer / 60000);
    //       let secs = ((timer % 60000) / 1000).toFixed(0);
    //       let theTime = (secs === 60 ? (mins + 1) + ":00" : mins + ":" + (secs < 10 ? "0" : "") + secs);
    //       let incorrectCount = incorrectAdd.length;
    //       //add results
    //       resultAdd.unshift([language, numbers, theTime, incorrectCount]);

    //       this.setState({ challenge: false, running: false, finished: true, results: resultAdd });
    //       incorrectAdd = [];
    //     } else {
    //       runSpeak(rand2, lang);
    //     }

    //     //challenge incorrect
    //   } else if (practice) {
    //     incorrectAdd.push(this.state.rand);
    //     this.setState({ incorrect: incorrectAdd, rand: rand });
    //     //  runSpeak(clicked+"  "+rand, lang);
    //     runSpeak(clicked, lang);
    //     runSpeakAll(rand, lang);

    //     //challenge incorrect
    //   } else if (this.state.challenge) {
    //     incorrectAdd.push(this.state.rand);
    //     this.setState({ incorrectQ: incorrectAdd, rand: rand });
    //     runSpeak(this.state.langs[this.state.langSelected][3], lang);
    //     runSpeakAll(rand, lang);
    //   } else {
    //     runSpeak(clicked, lang);
    //   }
  }



  // //start practice button
  const handleButtonClick = (e) => {

    //let lang = this.state.lang;
    let randomNumber = numbersList[Math.floor((Math.random() * numbersList.length))][0];
    console.log('randnum', randomNumber)
    let theNewNum = [];
    let nStart = numbersList[0][0];
    let nEnd = numbersList[numbersList.length - 1][0];
    console.log(nStart, nEnd,);

    for (i = nStart; i <= nEnd; i++) {
      theNewNum.push([i, 'num']);
    }
    console.log('newNum', theNewNum);

    setNumberList((prevState) => { return theNewNum }) // now sure why this is happening

    // starts practice, resets correct and incorrect arrays
    if (!practice) {
      console.log('practice false')

      setRand(randomNumber);
      setPractice(true);
      if (incorrect.length > 0) { setIncorrect(() => []) }
      if (correct.length > 0) { setCorrect(() => []) }

      runSpeak(randomNumber, lang);
      // stops test, resets correctAdd and incorrectAdd arrays
    } else {
      if (e.target.textContent === "Stop") {
        setPractice(false);

        // replays number said
      } else {
        runSpeak(rand, lang);
      }

    }
  }
  //start challenge button
  const handleQuizButtonClick = (e) => {
    let newRand = numbersList[Math.floor((Math.random() * numbersList.length))][0];
    //resets numbers to remove correct class
    let theNewNum = [];
    // for (i = this.state.from; i <= this.state.to; i++) {
    //   theNewNum.push([i, 'num']);
    // }

    let nStart = numbersList[0][0];
    let nEnd = numbersList[numbersList.length - 1][0];
    console.log(nStart, nEnd);

    for (i = nStart; i <= nEnd; i++) {
      theNewNum.push([i, 'num']);
    }
    console.log('hh', theNewNum);
    // starts challenge,
    if (!challenge) {

      setRand(newRand);
      setChallenge(true);
      setFinished(false);
      setIncorrectChallenge(() => []);
      setElapsedTime(0);
      setRunning(true);
      setPreviousTime(Date.now());
      setNumberList(() => theNewNum)

      runSpeak(newRand, lang);

      // stops challenge, resets incorrectAdd arrays
    } else {
      if (e.target.textContent === "Stop") {
        setChallenge(false);
        setRunning(false);

        // incorrectAdd = [] // what is that??
        //this.setState({ challenge: false, running: false });
        // incorrectAdd = []; 
        // replays number said
      } else {
        runSpeak(rand, lang);
      }
    }
  }


  return (
    <div className="App">

      <Menu />

      <Header
        langSelected={langSelected}
        langs={languageList}
        langShowClick={openLangsHandler}
        showLangs={showLangs}
        langOnClick={langClickedHandler}
      />

      <div className="container">

        <Numbers
          theNum={numbersList}
          onNumClick={handleNumberClick}
          numClass={'num'}
          onClickMinMinus={minMinusClickedHandler}
          onClickMinPlus={minPlusClickedHandler}
          onClickMaxMinus={maxMinusClickedHandler}
          onClickMaxPlus={maxPlusClickedHandler}
          challengeStart={challenge}
        />

        {/* <Learn
          learnList={learnList}
        //onClick={handleClick}
        /> */}


        {/* {showTest}  was commented */}
        {/* {showQuiz}
            {showTest2} */}

      </div>
      <PracticeBlock
        toShow={practice}
        onClick={handleButtonClick}
        correct={correct}
        incorrect={incorrect}
      />

      <ChallengeBlock
        toShow={challenge}
        onClick={handleQuizButtonClick}
        incorrect={incorrectChallenge}
        timer={theTime}

        finished={finished}
        results={results}

      />

    </div>
  );









  //class App extends Component {

  // constructor(props) {
  // super(props)

  // this.state = {
  //   showLangs: false, // hide lang list selection
  //   langs, // the array of languages to select
  //   langSelected: 6, // sets default language
  //   lang: "de-DE", // ......
  //   learnList: [[1, 'num']],
  //   numbersList,
  //   test: false, // to show if practice has been clicked

  //   // for Time challenge
  //   challenge: false, // sets challenge to not started

  //   finished: false,
  //   results: [],
  //   running: false,
  //   elapsedTime: 0,
  //   previousTime: 0,
  //   rand: '', // the random number said
  //   correct: [], // #endregion//array for correct answers
  //   incorrect: [], // array for incorrect answers
  //   incorrectQ: []
  // }

  // this.openLangsHandler = this.openLangsHandler.bind(this);
  // this.handleClick = this.handleClick.bind(this);
  // this.handleButtonClick = this.handleButtonClick.bind(this);
  // this.handleQuizButtonClick = this.handleQuizButtonClick.bind(this);
  // this.onTick = this.onTick.bind(this);
  // }






  //for timer
  // componentDidMount() {
  //   this.interval = setInterval(this.onTick, 100);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  // onTick() {
  //   if (this.state.running) {
  //     var now = Date.now();
  //     this.setState({
  //       previousTime: now,
  //       elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
  //     })
  //   }
  // }



  // need look at this later ------ ////// ----- /////
  //render() {
  // let correct = this.state.correct;
  // let incorrect = this.state.incorrect;
  // let incorrectQ = this.state.incorrectQ;
  // let showTest = null;
  // let showQuiz = null;
  // let showTest2 = null;

  // let timer = Math.floor(this.state.elapsedTime);
  // let mins = Math.floor(timer / 60000);
  // let secs = ((timer % 60000) / 1000).toFixed(0);
  // let theTime = (secs === 60 ? (mins + 1) + ":00" : mins + ":" + (secs < 10 ? "0" : "") + secs);

  // if (this.state.challenge !== true && this.state.finished === false) {
  //   showTest = <PracticeBlock
  //     toShow={practice}
  //     onClick={this.handleButtonClick}
  //     correct={correct}
  //     incorrect={incorrect}
  //   />
  // }
  // if (practice !== true) {
  //   showQuiz = <ChallengeBlock
  //     toShow={this.state.challenge}
  //     onClick={this.handleQuizButtonClick}
  //     incorrect={incorrectQ}
  //     timer={theTime}

  //     finished={this.state.finished}
  //     results={this.state.results}
  //   />
  // }
  // if (this.state.finished === true) {
  //   showTest2 = <PracticeBlock
  //     toShow={practice}
  //     onClick={this.handleButtonClick}
  //     correct={correct}
  //     incorrect={incorrect}
  //   />
  // }

  // return (
  //   <div className="App">

  //     <Header
  //       langSelected={this.state.langSelected}
  //       langs={langs}
  //       langShowClick={this.openLangsHandler}
  //       showLangs={this.state.showLangs}
  //       langOnClick={this.langClickedHandler}
  //     />

  //     <div className="container">

  //       <Numbers
  //         theNum={this.state.numbersList}
  //         onClick={this.handleClick}
  //         numClass={'num'}
  //         onClickMinMinus={this.minMinusClickedHandler}
  //         onClickMinPlus={this.minPlusClickedHandler}
  //         onClickMaxMinus={this.maxMinusClickedHandler}
  //         onClickMaxPlus={this.maxPlusClickedHandler}
  //         challengeStart={this.state.challenge}
  //       />

  {/* <Learn
            learnList={this.state.learnList}
            onClick={this.handleClick}
          />
           */}
  {/* <div className="container"><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi velit quia molestiae sint dolorem eos culpa aperiam sit porro perferendis. Aut corrupti id minus laudantium aspernatur facilis dolorum distinctio esse.</p></div> */ }


  {/* {showTest}  was commented*/ }
  {/* {showQuiz}
            {showTest2} */}

  //     </div>

  //   </div>
  // );
  //}
}

export default App;
