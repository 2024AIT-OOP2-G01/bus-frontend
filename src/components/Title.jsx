import React from 'react'
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 64px;
  @media screen and (max-width: 1000px){
    font-size: 40px;
  }
`

const H2 = styled.h2`
  font-size: 20px;
  @media screen and (max-width: 1000px){
    font-size: 14px;
  }
`

const Title = () => {
  return (
    <div>
      <H1>ギリ間に合うナビ</H1>
      <br />
      <H2>このアプリは、愛工大のバスから愛環にスムーズに<br></br>乗車するための最短時間を表示したアプリです。</H2>
    </div>
  )
}

export default Title
