import { useState } from 'react'
import styled from "styled-components"
import { NextTime } from './NextTime'
import Footer from './footer'

function App() {

  const WhiteContainer = styled.div`
    width: 90%;
    margin: auto; 
    background-color: #FFF;
    padding-top: 5%;
  `

  const BlueContainer = styled.div`
    background-color: #64C3D5;0;
  `

  const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1000px){
      flex-direction: column;
      align-items: center;
    }
  `

  return (
    <>
      <BlueContainer>
        <WhiteContainer>
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
          <Footer />
        </WhiteContainer>
      </BlueContainer>
    </>
  )
}

export default App
