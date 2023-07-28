import React from 'react';
import './langSelect.scss';

export const LangSelect = ({ languageList, langOnClick }) => {

  return (
    <ul className='LangSelect'>
      {languageList.map((language, index) => {
        return (
          <li key={index} onClick={() => langOnClick(index)}>
            {language.enName} / {language.name}
          </li>
        )
      })
      }
    </ul>
  )

}
