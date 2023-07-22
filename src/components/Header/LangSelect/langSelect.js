import React from 'react';
import './langSelect.scss';

export const LangSelect = ( {langs, langOnClick}) => {

  return (
    <ul className='LangSelect'>
      {langs.map((lang, index) => {
        return (
            <li key={index} onClick={() => langOnClick(index)}>
            {lang[0]} / {lang[2]}
          </li>
        )
      })
      }
    </ul>
  )

}
