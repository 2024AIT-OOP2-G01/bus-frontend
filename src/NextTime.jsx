import React from 'react'
import styled from "styled-components"

export const NextTime = (
    {
        Word = '日本語が入ります',
        fontSize = '32px',
        width = '540px',
        height = '240px',
        margin = '0 auto'
    }
) => {

    const Title = styled.p`
        color: #0F0;
        text-align: center;
        font-family: Inter;
        font-size: ${fontSize};
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        @media screen and (max-width: 1000px){
            font-size: 24px;
        }
        @media screen and (max-width: 600px){
            font-size: 16px;
        }
    `

    const Limit = styled.div`
        color: #0F0;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: baseline;
        @media screen and (max-width: 600px){
            font-size: 16px;
        }
    `

    const BigSize = styled.p`
        color: #0F0;
        text-align: center;
        font-family: Inter;
        font-size: 64px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        @media screen and (max-width: 600px){
            font-size: 48px;
        }
    `

    const Wrapper = styled.div`
        width: ${width};
        height: ${height};
        margin: ${margin};
        background-color: #000;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        @media screen and (max-width: 1000px){
            width: 300px;
        }
        @media screen and (max-width: 600px){
            width: 200px;
        }
    `
  return (
    <Wrapper>
        <Title>{Word}</Title>
        <Limit>あと<BigSize>5</BigSize>分</Limit>
    </Wrapper>
  )
}
export default NextTime