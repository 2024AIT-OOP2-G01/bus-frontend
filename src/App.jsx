import { useState, useEffect } from "react";
import useLocation from "./hooks/useLocation";
import useTimeCalc from "./hooks/useTimeCalc";
import styled from "styled-components";
import Title from "./Title";
import Just_Bus from "./Just_Bus";
import Timetable from "./Timetable";
import NextTime from "./NextTime";
import Footer from "./Footer";

  const BigWrapper = styled.div`
    text-align: center;
    padding: 5% 0;
  `;

  const WhiteContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const BlueContainer = styled.div`
    background-color: #64c3d5;
  `;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
    }
  `;
  
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
    }
  `;

function App() {
  const [kouzouzi, setKouzouzi] = useState([]);
  const [okazaki, setOkazaki] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState("home"); // 状態を管理
  const [limitkouzouzi, setLimitKouzouzi] = useState([]);
  const [limitokazaki, setLimitOkazaki] = useState([]);
  const [limitbus, setLimitBus] = useState([]); // 状態を管理
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
        console.error("データ取得に失敗:", error);
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
        console.error("データ取得に失敗:", error);
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
            {/* Just_BusとNextTimeを"home"のみで表示 */}
            {selectedTimetable === "home" && (
              <>
                <Just_Bus
              thisbus="ちょうどいいバス…"
              okazaki={okazakiGiri}
              kouzouzi={kouzouziGiri}
            />
                <Just_Bus thisbus="次にちょうどいいバス…" />
                <NextTime Word="次のバスが出発するまで" />
                <FlexWrapper>
                  <NextTime Word="高蔵寺行き" width="270px" margin="0" />
                  <NextTime Word="岡崎行き" width="270px" margin="0" />
                </FlexWrapper>
              </>
            )}
            {/* Timetableの表示切り替え */}
            {selectedTimetable === "kouzouzi" && (
              <Timetable time={kouzouzi} title="高蔵寺行き時刻表" />
            )}
            {selectedTimetable === "okazaki" && (
              <Timetable time={okazaki} title="岡崎行き時刻表" />
            )}
          </WhiteContainer>
          {/* Footerに状態とイベントを渡す */}
          <Footer onSelect={setSelectedTimetable} />
        </BlueContainer>
      </BigWrapper>
    </>
  );
}

export default App;
