import React from 'react';
import './header.scss';
import { LangSelect } from './LangSelect/langSelect';

export const Header = ({ langSelected, langs, langShowClick, showLangs, langOnClick }) => {

  return (
    <header className='Header'>
      <h1>Count <span className='in'>In</span></h1>
      <h2>
        <span className='selLang' onClick={langShowClick}>
          <span className='langEng'>{langs[langSelected][0]}</span> / <span className='langNativ'>{langs[langSelected][2]}</span>
        </span>
      </h2>
      {showLangs &&
        <LangSelect
          langs={langs}
          // selectedLang={langSelected}
          langOnClick={langOnClick}
        />
      }

    </header >
  );
}
