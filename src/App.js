import { useState, useEffect } from 'react';

import './App.scss';
// import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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

// function speakDeAll(say, lang) {
//   to_speak = new SpeechSynthesisUtterance(say);
//   to_speak.lang = lang;
//   to_speak.rate = 0.9;
//   speech.speak(to_speak)
// }

const App = () => {
  let defaultNumbersList = [];
  let j;
  // the displayed numbers --Default
  for (j = 1; j <= 10; j++) {
    defaultNumbersList.push([j, 'num']);
  }

  //set up states -- not all need to be state 
  const [showLangs, setShowLangs] = useState(false); // hide lang list selection
  const [langs, setLangs] = useState(); // the array of languages to select
  const [langSelected, setLangSelected] = useState(6); // sets default language
  const [lang, setLang] = useState("de-DE");
  const [learnList] = useState([[1, 'num']]);
  const [numbersList, setNumberList] = useState(defaultNumbersList);
  const [test, setTest] = useState(false); // to show if practice has been clicked
  const [germanVoice, setGermanVoice] = useState();

  // for Time challenge
  const [challenge, setChallenge] = useState(false); // sets challenge to not started

  const [finished] = useState(false);
  const [results] = useState([]);
  const [running] = useState(false);
  const [elapsedTime] = useState(0);
  const [previousTime] = useState(0);
  const [rand] = useState(''); // the random number said
  const [correct] = useState([]); // #endregion//array for correct answers
  const [incorrect] = useState([]); // array for incorrect answers
  const [incorrectQ] = useState([]);

  useEffect(()=>{
    const voicesAll = speechSynthesis.getVoices();
    const vuris = [];
    const voices = [];
  
    //unfortunately we have to check for duplicates
    voicesAll.forEach(function (obj) {
      const uri = obj.voiceURI;
  
      //if voiceuri is not in obj.voiceuri then push to array vuris-- makes a list of unique voiceURI's 
      if (!vuris.includes(uri)) {
  
        vuris.push(uri);
        // get list of only german voices not including Anna (she is strange!)
        if (obj.lang === 'de-DE' && obj.name !== "Anna") {
            voices.push(obj);
        }
      }
    });
  
   setGermanVoice(voices[0]);

  },[germanVoice,setGermanVoice]);


  // make speak
const speech = window.speechSynthesis;
let to_speak;

function speakDe(say, lang) {

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

    speakDe(languageList[newLangSelected][2], newLang);
    setLang(newLang);
    setLangSelected(newLangSelected);
    setShowLangs(false)
  }



  // Numbers Changed //
  //Max minus
  const maxMinusClickedHandler = () => {

    let newNumbersList = numbersList;
    const startNum = newNumbersList[0][0];
    if (startNum > 1) {

      for (i = 1; i <= 10; i++) {
        newNumbersList.pop();
      }

      for (i = startNum - 1; i >= startNum - 10; i--) {
        newNumbersList.unshift([i, 'num']);
      }

      setNumberList(newNumbersList)
    }
  }

  //Max plus
  const maxPlusClickedHandler = () => {
    let newNumbersList = numbersList;
    const numEnd = newNumbersList.length;
    const endNumber = newNumbersList[numEnd - 1][0];

    for (i = endNumber + 1; i < endNumber + 11; i++) {
      newNumbersList.push([i, 'num']);
    }

    for (i = 1; i <= 10; i++) {
      newNumbersList.shift();
    }

    setNumberList(newNumbersList)

  }

  // Row minus
  const minMinusClickedHandler = () => {
    let newNumbersList = numbersList;
    const numEnd = newNumbersList[newNumbersList.length - 1][0] - 10;
    //remove last 10 items
    if (numEnd >= 10) {
      for (i = 1; i <= 10; i++) {
        newNumbersList.pop();
      }
      // this.setState({
      //   numbersList: newNumbersList
      // })
      setNumberList(newNumbersList)
    }
  }

  //Row plus
  const minPlusClickedHandler = () => {
    let newNumbersList = numbersList;
    const numStart = newNumbersList[newNumbersList.length - 1][0] + 1;

    for (i = numStart; i < numStart + 10; i++) {
      newNumbersList.push([i, 'num']);
    }
    // this.setState({
    //   numbersList: newNumbersList
    // })
    setNumberList(newNumbersList)

  };

  //number clicked
  const handleNumberClick = (e) => {

    const clicked = Number(e.currentTarget.textContent);
    // console.log('clicked', clicked);

    let rand = numbersList[Math.floor((Math.random() * numbersList.length))][0];

    let theNum = numbersList;
    let theNewNum = [];
    let numClassC = 'num correct';

    // this.setState({ clicked: clicked });

    // console.log('clicked', clicked, lang);
    speakDe(clicked, lang);

    //practice is correct
    //   if (clicked === this.state.rand && this.state.test) {

    //     correctAdd.push(this.state.rand);
    //     this.setState({ correct: correctAdd, rand: rand });

    //     speakDe(clicked, lang);
    //     speakDe(rand, lang);

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
    //       speakDe(rand2, lang);
    //     }

    //     //challenge incorrect
    //   } else if (this.state.test) {
    //     incorrectAdd.push(this.state.rand);
    //     this.setState({ incorrect: incorrectAdd, rand: rand });
    //     //  speakDe(clicked+"  "+rand, lang);
    //     speakDe(clicked, lang);
    //     speakDeAll(rand, lang);

    //     //challenge incorrect
    //   } else if (this.state.challenge) {
    //     incorrectAdd.push(this.state.rand);
    //     this.setState({ incorrectQ: incorrectAdd, rand: rand });
    //     speakDe(this.state.langs[this.state.langSelected][3], lang);
    //     speakDeAll(rand, lang);
    //   } else {
    //     speakDe(clicked, lang);
    //   }
  }

  //start practice button
  const handleButtonClick = (e) => {

    let lang = this.state.lang;
    let rand = this.state.numbersList[Math.floor((Math.random() * this.state.numbersList.length))][0];
    let theNewNum = [];
    let nStart = this.state.numbersList[0][0];
    let nEnd = this.state.numbersList[this.state.numbersList.length - 1][0];
    console.log(nStart, nEnd);

    for (i = nStart; i <= nEnd; i++) {
      theNewNum.push([i, 'num']);
    }
    this.setState({
      numbersList: theNewNum
    });

    // starts practice, resets correct and incorrect arrays
    if (this.state.test !== true) {

      this.setState({
        rand: rand,
        test: true,
        incorrect: [],
        correct: [],
        numberList: theNewNum
      });

      speakDe(rand, lang);
      // stops test, resets correctAdd and incorrectAdd arrays
    } else {
      if (e.currentTarget.textContent === "Stop") {
        this.setState({ test: false });
        correctAdd = [];
        incorrectAdd = [];
        // replays number said
      } else {

        speakDe(this.state.rand, lang);

      }

    }
  }
  //start challenge button
  const handleQuizButtonClick = (e) => {
    let lang = this.state.lang;
    let rand = this.state.numbersList[Math.floor((Math.random() * this.state.numbersList.length))][0];
    //resets numbers to remove correct class
    let theNewNum = [];
    // for (i = this.state.from; i <= this.state.to; i++) {
    //   theNewNum.push([i, 'num']);
    // }

    let nStart = this.state.numbersList[0][0];
    let nEnd = this.state.numbersList[this.state.numbersList.length - 1][0];
    console.log(nStart, nEnd);

    for (i = nStart; i <= nEnd; i++) {
      theNewNum.push([i, 'num']);
    }
    console.log('hh', theNewNum);
    // starts challenge,
    if (this.state.challenge !== true) {
      this.setState({
        rand: rand,
        challenge: true,
        finished: false,
        incorrectQ: [],
        elapsedTime: 0,
        running: true,
        previousTime: Date.now(),
        numbersList: theNewNum
      });
      speakDe(rand, lang);

      // stops challenge, resets incorrectAdd arrays
    } else {
      if (e.currentTarget.textContent === "Stop") {
        this.setState({ challenge: false, running: false });
        incorrectAdd = [];
        // replays number said
      } else {
        speakDe(this.state.rand, lang);
      }
    }
  }


  return (
    <div className="App">

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
            learnList={this.state.learnList}
            onClick={this.handleClick}
          />
           */}
        {/* <div className="container"><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi velit quia molestiae sint dolorem eos culpa aperiam sit porro perferendis. Aut corrupti id minus laudantium aspernatur facilis dolorum distinctio esse.</p></div> */}


        {/* {showTest}  was commented*/}
        {/* {showQuiz}
            {showTest2} */}

      </div>

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
  //     toShow={this.state.test}
  //     onClick={this.handleButtonClick}
  //     correct={correct}
  //     incorrect={incorrect}
  //   />
  // }
  // if (this.state.test !== true) {
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
  //     toShow={this.state.test}
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
