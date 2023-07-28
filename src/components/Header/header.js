import React from 'react';
import './header.scss';
import { LangSelect } from './LangSelect/langSelect';

const Header = ({ langSelected, languageList, onOpenLangsClick, showLangs, langOnClick }) => {

  return (
    <header className='header'>
      <h1>Count <span className='in'>In</span></h1>
      <h2>
        <span className='selLang' onClick={onOpenLangsClick}>
          <span className='langEng'>{languageList[langSelected].enName}</span> / <span className='langNativ'>{languageList[langSelected].name}</span>
        </span>
      </h2>
      {showLangs &&
        <LangSelect
          languageList={languageList}
          // selectedLang={langSelected}
          langOnClick={langOnClick}
        />
      }

    </header >
  );
}
export default Header;
