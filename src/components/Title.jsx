import React from 'react'
import styled from "styled-components";

const H2 = styled.h2`
  font-size: 20px;
`

const Title = () => {
  return (
    <div>
      <h1>ギリギリ間に合うナビ</h1>
      <br />
      <H2>このアプリは、愛工大のバスから愛環にスムーズに<br></br>乗車するための最短時間を表示したアプリです。</H2>
    </div>
  )
}

export default Title
