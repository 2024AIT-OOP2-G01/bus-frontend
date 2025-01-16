import React from 'react'
import styled from "styled-components"

const Footer = () => {

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 90%;
    margin: 0 auto;
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