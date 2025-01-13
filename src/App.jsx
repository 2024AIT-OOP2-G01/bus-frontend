import { useState } from 'react'
import styled from "styled-components"
import { NextTime } from './NextTime'

function App() {

  const Container = styled.div`
    background-color: #64C3D5;0;
  `

  const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;
  `
  
  return (
    <>
      <Container>
        <p>ギリ間に合うナビ</p>
        <NextTime 
          Word='次のバスが出発するまで'
        />
        <FlexWrapper>
          <NextTime 
            Word='高蔵寺行き'
            width='300px'
            margin = '0'
          />
          <NextTime 
            Word='岡崎行き'
            width='300px'
            margin = '0'
          />
        </FlexWrapper>
        <div>時刻表</div>
      </Container>
    </>
  )
}

export default App
