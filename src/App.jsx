import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useLocation from "./hooks/useLocation";
import styled from "styled-components"
import "./App.css";
import Title from "./Title";
import Just_Bus from "./Just_Bus";
import Timetable from "./Timetable";
import NextTime from "./NextTime";
import Footer from './Footer';


function App() {
  const [count, setCount] = useState(0);
  const [kouzouzi, setKouzouzi] = useState([]);
  const [okazaki, setOkazaki] = useState([]);

  useEffect(() => {
    // 高蔵寺行きの時刻表の取得
    const fetchKouzouziTimeTable = async () => {
      console.log("副作用関数が実行されました！");
      const url = "http://127.0.0.1:9999/api/aikann/yakusa_to_kouzouzi";
      try {
        fetch(url)
          .then((response) => response.json()) // JSONに変換
          .then((data) => {
            setKouzouzi(data)
          })
          .catch((error) => console.error("データ取得に失敗:", error));
      } catch (error) {
        console.error(error.message);
      }
    };

    // 岡崎行きの時刻表の取得
    const fetchOkazakiTimeTable = async () => {
      console.log("副作用関数が実行されました！");
      const url = "http://127.0.0.1:9999/api/aikann/yakusa_to_okazaki";
      try {
        fetch(url)
          .then((response) => response.json()) // JSONに変換
          .then((data) => {
            setOkazaki(data)
          })
          .catch((error) => console.error("データ取得に失敗:", error));
      } catch (error) {
        console.error(error.message);
      }
    };

    
    fetchKouzouziTimeTable();
    fetchOkazakiTimeTable();
  }, []);

  const BigWrapper = styled.div`

  `

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
    <BigWrapper>
      <BlueContainer>
      <Title />
        <WhiteContainer>
        <Just_Bus thisbus="ちょうどいいバス…"/>
        <Just_Bus thisbus="次にちょうどいいバス…"/>
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
    </BigWrapper>
      <Just_Bus thisbus="ちょうどいいバス…" />
      <Just_Bus thisbus="次にちょうどいいバス…" />
      <Timetable
        time={kouzouzi}
        title="高蔵寺行き"
      />
      <Timetable
      time={okazaki}
      title="岡崎行き"
      />
    </>
  )
}

export default App
