import React from 'react'

export const Buttons = ({toShow,onClick}) => {
  if (toShow === true) {
    return (
      <div>
        <button type='button' className='stop btn' onClick={onClick}>Stop</button>
        <button type='button' className='repeat btn' onClick={onClick}>Repeat</button>
      </div>
    )
  } else {
    return (
      <div>
        <button type='button' className='play btn' onClick={onClick}>Play</button>
      </div>

    )
  }
}
