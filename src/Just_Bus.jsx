import React from 'react'
import styled from "styled-components";

const Just_Bus = (props) => {
    
const White_board = styled.div`
  width: 430px;
  padding-bottom: 5%;
  @media screen and (max-width: 1000px){
    width: 265px;
    padding-bottom: 5%;
  }
`

  return (
    <White_board>
       <fieldset id='best'>
          <h3>{props.thisbus}</h3>
          { props.okazaki === "0" ? <h3>高蔵寺行きに間に合うまで<br></br><span className='highlight'>ギリ間に合わないかも...</span></h3> : <h3>高蔵寺行きに間に合うまで<br></br>あと <span className='highlight'>{props.okazaki}</span> 分</h3>}
          { props.kouzouzi === "0" ? <h3>岡崎行きに間に合うまで<br></br><span className='highlight'>ギリ間に合わないかも...</span></h3> : <h3>岡崎行きに間に合うまで<br></br>あと <span className='highlight'>{props.kouzouzi}</span> 分</h3>}
        </fieldset>
    </White_board>
  )
}

export default Just_Bus
