import React from 'react'
import styled from "styled-components"

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: fixed;
right: 0;
bottom: 0;
width: 100%;
`

const Ul = styled.ul`
display: flex;
width: 70%;
justify-content: space-evenly;
align-items: center;
list-style: none;
border: 1px solid #000;
background-color: #FFF;    
@media screen and (max-width: 1000px){
  width: 100%;
}
`

const Li = styled.li`
color: #000;
font-family: Inter;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const Border = styled.div`
width: 1px;
height: 20px;
background-color: #000;
`

const Footer = () => {
  return (
    <Container>
      <Ul>
        <Li>高蔵寺時刻表</Li>
        <Border></Border>
        <Li>ギ</Li>
        <Border></Border>
        <Li>岡崎時刻表</Li>
      </Ul>
    </Container>
  )
}

export default Footer