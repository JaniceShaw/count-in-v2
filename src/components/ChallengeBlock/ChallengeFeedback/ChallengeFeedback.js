import React from 'react'

function T2 (props) {
  if (Number(props.incorrect) !== 0) {
    return (
      <span>
        <strong>Incorrect:</strong>
      </span>
    )
  } else {
    return (
      null
    )
  }
}

export const ChallengeFeedback = (props) => {
  let incorrect = props.incorrect

  return (
    <div className='challenge-feedback'>
      <T2 incorrect={incorrect} />
      <ul className='challenge-feedback-incorrect'>
        {incorrect.map((incorrect, index) => <li key={index}>{incorrect}</li>)}
      </ul>
    </div>
  )
}
