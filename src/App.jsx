import { useState, useEffect } from "react";
import useLocation from "./hooks/useLocation";
import useTimeCalc from "./hooks/useTimeCalc";
import styled from "styled-components";
import Title from "./components/Title";
import Just_Bus from "./components/Just_Bus";
import Timetable from "./components/Timetable";
import NextTime from "./components/NextTime";
import Footer from "./components/Footer";

  const BigWrapper = styled.div`
    text-align: center;
  `;

  const WhiteContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1000px) {
      width: 100%;
      padding: 4% 0;
    }
  `;

  const BlueContainer = styled.div`
    background-color: #64c3d5;
    padding: 10% 0;
    `

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
    fetchNearTimeTable();
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

  const fetchNearTimeTable = async () => {
    const date = new Date()
    const bus = `https://ait-busdiaa-api.onrender.com/?time=${date.getHours()}:${date.getMinutes()}`;
    const kouzouji = `https://bus-backend-g28r.onrender.com/api/aikann/yakusa_to_kouzouzi/next?time=${date.getHours()}:${date.getMinutes()}`;
    const okazaki = `https://bus-backend-g28r.onrender.com/api/aikann/yakusa_to_okazaki/next?time=${date.getHours()}:${date.getMinutes()}`;
    try {
      fetch(bus)
        .then((response) => response.json())
        .then((data) => {
          setLimitBus(calculateTimeDifference(data.next_time))
        })
        .catch((error) => console.error("データ取得に失敗:", error));
      fetch(kouzouji)
        .then((response) => response.json())
        .then((data) => {
          setLimitKouzouzi(calculateTimeDifference(data.next_time))
        })
        .catch((error) => console.error("データ取得に失敗:", error));
      fetch(okazaki)
        .then((response) => response.json())
        .then((data) => {
          setLimitOkazaki(calculateTimeDifference(data.next_time))
        })
        .catch((error) => console.error("データ取得に失敗:", error));
    } catch (error) {
      console.error("データ取得に失敗:", error);
    }
  };

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
      fetchNearTimeTable();
    }
  }, [currentTime]);

  function calculateTimeDifference(inputTimeStr) {
      try {
          // 入力の形式を確認 (HH:MM)
          const timeParts = inputTimeStr.split(":");
          if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
              throw new Error("無効な形式です。'HH:MM' 形式で入力してください。");
          }
  
          // 入力された時間をDateオブジェクトに変換
          const now = new Date();
          const inputTime = new Date(now);
          inputTime.setHours(parseInt(timeParts[0], 10));
          inputTime.setMinutes(parseInt(timeParts[1], 10));
          inputTime.setSeconds(0);
          inputTime.setMilliseconds(0);
  
          // 差分をミリ秒単位で計算
          const timeDifferenceMs = inputTime - now;
  
          // 結果を秒、分、時間単位で変換
          const differenceInSeconds = timeDifferenceMs / 1000;
          const differenceInMinutes = differenceInSeconds / 60;
          return(Math.round(differenceInMinutes.toFixed(2)));
      } catch (error) {
          console.error(error.message);
      }
  }

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
                <NextTime Word="次のバスが出発するまで" time={limitbus}/>
                <FlexWrapper>
                  <NextTime Word="高蔵寺行き" width="270px" margin="0" time={limitkouzouzi}/>
                  <NextTime Word="岡崎行き" width="270px" margin="0" time={limitokazaki}/>
                </FlexWrapper>
              </>
            )}
            {/* Timetableの表示切り替え */}
            {selectedTimetable === "kouzouzi" && (
              <Timetable time={kouzouzi} title="高蔵寺行き" />
            )}
            {selectedTimetable === "okazaki" && (
              <Timetable time={okazaki} title="岡崎行き" />
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
