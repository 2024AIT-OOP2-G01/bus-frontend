import React from 'react'


const Just_Bus = (props) => {
    
  return (
    <div>
       <fieldset id='best' className='white_board'>
          <h3>{props.thisbus}</h3>
          { props.okazaki === "0" ? <h3>高蔵寺行きに間に合うまで<br></br><span className='highlight'>ギリ間に合わないかも...</span></h3> : <h3>高蔵寺行きに間に合うまで<br></br>あと <span className='highlight'>{props.okazaki}</span> 分</h3>}
          { props.kouzouzi === "0" ? <h3>岡崎行きに間に合うまで<br></br><span className='highlight'>ギリ間に合わないかも...</span></h3> : <h3>岡崎行きに間に合うまで<br></br>あと <span className='highlight'>{props.kouzouzi}</span> 分</h3>}
        </fieldset>
    </div>
  )
}

export default Just_Bus
