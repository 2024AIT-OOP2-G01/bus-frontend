import { useState, useEffect } from "react";
import useLocation from "./hooks/useLocation";
import useTimeCalc from "./hooks/useTimeCalc";
import styled from "styled-components";
import "./App.css";
import Title from "./Title";
import Just_Bus from "./Just_Bus";
import Timetable from "./Timetable";
import NextTime from "./NextTime";
import Footer from "./Footer";

const BigWrapper = styled.div``;

const WhiteContainer = styled.div`
  width: 90%;
  margin: auto;
  background-color: #fff;
  padding-top: 5%;
`;

const BlueContainer = styled.div`
  background-color: #64C3D5;0;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

function App() {
  const [kouzouzi, setKouzouzi] = useState([]);
  const [okazaki, setOkazaki] = useState([]);
  const [location, { getLocation }] = useLocation();
  const [okazakiGiri, { fetchData: hFetchOkazakiGiri }] = useTimeCalc();
  const [kouzouziGiri, { fetchData: hFetchKouzouziGiri }] = useTimeCalc();
  const [currentTime, setCurrentTime] = useState(new Date());

  // 初回のフェッチ処理
  useEffect(() => {
    // 高蔵寺行きの時刻表の取得
    const fetchKouzouziTimeTable = async () => {
      const url = "https://bus-backend-g28r.onrender.com/api/aikann/yakusa_to_kouzouzi";
      try {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setKouzouzi(data);
          })
          .catch((error) => console.error("データ取得に失敗:", error));
      } catch (error) {
        console.error(error.message);
      }
    };

    // 岡崎行きの時刻表の取得
    const fetchOkazakiTimeTable = async () => {
      const url = "https://bus-backend-g28r.onrender.com/api/aikann/yakusa_to_okazaki";
      try {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setOkazaki(data);
          })
          .catch((error) => console.error("データ取得に失敗:", error));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchKouzouziTimeTable();
    fetchOkazakiTimeTable();
    getLocation();
  }, []);

  // 位置情報が取得され次第fetch
  useEffect(() => {
    if (location[0] !== 0) {
      fetchGiri();
    }
  }, [location]);

  // 1秒ごとに現在時刻を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  const fetchGiri = async () => {
    const fetchOkazakiGiri = async () => {
      await hFetchOkazakiGiri(location, "okazaki");
    };
    const fetchKouzouziGiri = async () => {
      await hFetchKouzouziGiri(location, "kouzouzi");
    };

    fetchOkazakiGiri();
    fetchKouzouziGiri();
  };

  // 時間を見守り分が変わったタイミングで実行
  useEffect(() => {
    const seconds = currentTime.getSeconds();
    if (seconds === 0) {
      fetchGiri();
    }
  }, [currentTime]);
  return (
    <>
      <BigWrapper>
        <BlueContainer>
          <Title />
          <WhiteContainer>
            <Just_Bus
              thisbus="ちょうどいいバス…"
              okazaki={okazakiGiri}
              kouzouzi={kouzouziGiri}
            />
            {/* <Just_Bus thisbus="次にちょうどいいバス…" /> */}
            <NextTime Word="次のバスが出発するまで" />
            <FlexWrapper>
              <NextTime Word="高蔵寺行き" width="300px" margin="0" />
              <NextTime Word="岡崎行き" width="300px" margin="0" />
            </FlexWrapper>
            <Footer />
          </WhiteContainer>
        </BlueContainer>
      </BigWrapper>
      <Timetable time={kouzouzi} title="高蔵寺行き" />
      <Timetable time={okazaki} title="岡崎行き" />
    </>
  );
}

export default App;
