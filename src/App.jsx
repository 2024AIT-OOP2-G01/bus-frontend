import { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "./Title";
import Just_Bus from "./Just_Bus";
import Timetable from "./Timetable";
import NextTime from "./NextTime";
import Footer from "./Footer";

function App() {
  const [kouzouzi, setKouzouzi] = useState([]);
  const [okazaki, setOkazaki] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState("home"); // 状態を管理
  const [limitkouzouzi, setLimitKouzouzi] = useState([]);
  const [limitokazaki, setLimitOkazaki] = useState([]);
  const [limitbus, setLimitBus] = useState([]); // 状態を管理
  

  useEffect(() => {
    // 高蔵寺行きの時刻表の取得
    const fetchKouzouziTimeTable = async () => {
      const url = "http://127.0.0.1:9999/api/aikann/yakusa_to_kouzouzi";
      try {
        const response = await fetch(url);
        const data = await response.json();        
        setKouzouzi(data);
      } catch (error) {
        console.error("データ取得に失敗:", error);
      }
    };

    // 岡崎行きの時刻表の取得
    const fetchOkazakiTimeTable = async () => {
      const url = "http://127.0.0.1:9999/api/aikann/yakusa_to_okazaki";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setOkazaki(data);
      } catch (error) {
        console.error("データ取得に失敗:", error);
      }
    };

    // 岡崎行きの時刻表の取得
    const fetchLimit = async () => {
      //
      let nowtime = new Date().toLocaleTimeString();


      // const url = `/api/aikann/yakusa_to_kouzouzi/next?current_time=${}`;
      // try {
      //   const response = await fetch(url);
      //   const data = await response.json();
      //   setOkazaki(data);
      // } catch (error) {
      //   console.error("データ取得に失敗:", error);
      // }
    };

    fetchKouzouziTimeTable();
    fetchOkazakiTimeTable();
    fetchLimit();
  }, []);

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

  const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
    }
  `;

  return (
    <>
      <BigWrapper>
        <BlueContainer>
          <Title />
          <WhiteContainer>
            {/* Just_BusとNextTimeを"home"のみで表示 */}
            {selectedTimetable === "home" && (
              <>
                <Just_Bus thisbus="ちょうどいいバス…" />
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
