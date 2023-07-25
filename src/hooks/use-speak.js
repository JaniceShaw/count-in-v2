import { useState } from "react";

const useSpeak = (say, lang, germanVoice) => {
    // load first available german voice only once
    // const [germanVoice, setGermanVoice] = useState(null);

    // if(!germanVoice){
    //     //should only run one time
    //     console.log('in useSpeak-load voice');

    // }

    // make speak
    const speech = window.speechSynthesis;
    let to_speak;

    function shutUp() {
        speech.cancel()
    }

    // function speakDe(say, lang) {
    shutUp();

    to_speak = new SpeechSynthesisUtterance(say);
    to_speak.lang = lang;
    // default german voice anna not working need to change to an alternative german voice
    if (lang === 'de-DE') {

        console.log('got here german selected');
        to_speak.voice = germanVoice;
    }

    to_speak.rate = 0.9;
    speech.speak(to_speak)
}


export default useSpeak;