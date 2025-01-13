import React from 'react'
import styled from "styled-components"

export const NextTime = (
    {
        Word = '日本語が入ります',
        fontSize = '32px',
        width = '600px',
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
    `

    const Limit = styled.div`
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: baseline;
    `

    const BigSize = styled.p`
        color: #0F0;
        text-align: center;
        font-family: Inter;
        font-size: 64px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    `

    const Wrapper = styled.div`
        width: ${width};
        height: ${height};
        margin: ${margin};
        background-color: #000;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    `
  return (
    <Wrapper>
        <Title>{Word}</Title>
        <Limit>あと<BigSize>5</BigSize>分</Limit>
    </Wrapper>
  )
}
