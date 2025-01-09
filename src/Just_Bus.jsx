import React from 'react'


const Just_Bus = (props) => {

    const count = 0;
  return (
    <div>
       <fieldset id='best' className='white_board'>
          <h3>{props.thisbus}</h3>
          <h3>高蔵寺行きに間に合うまで<br></br>あと <span className='highlight'>{count}</span> 分</h3>
          <h3>岡崎行きに間に合うまで<br></br>あと <span className='highlight'>{count}</span> 分</h3>
        </fieldset>
    </div>
  )
}

export default Just_Bus
