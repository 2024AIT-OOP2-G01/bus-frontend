import React from 'react'
import styled from "styled-components";

const White_board = styled.div`
  width: 430px;
  padding-bottom: 8%;
  @media screen and (max-width: 1000px){
    width: 360px;
    padding: 5% 0;
  }
`

const Field = styled.fieldset`
  border: 1px solid #000;
`

const Jap = styled.h3`
  font-size: 30px;
`

const H3 = styled.h3`
  fonst-size: 30px;
`

const Just_Bus = (props) => {

  return (
    <White_board>
       <Field id='best'>
          <h3>{props.thisbus}</h3>
          { props.okazaki === "0" ? <H3>高蔵寺行きに間に合うまで<br></br><Jap className='highlight'>ギリ間に合わないかも...</Jap></H3> : <H3>高蔵寺行き<br></br>あと <span className='highlight'>{props.okazaki}</span> 分ゆっくりできます。</H3>}
          { props.kouzouzi === "0" ? <H3>岡崎行きに間に合うまで<br></br><Jap className='highlight'>ギリ間に合わないかも...</Jap></H3> : <H3>岡崎行き<br></br>あと <span className='highlight'>{props.kouzouzi}</span> 分ゆっくりできます</H3>}
        </Field>
    </White_board>
  )
}

export default Just_Bus
