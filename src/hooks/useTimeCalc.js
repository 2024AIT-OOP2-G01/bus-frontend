import { useState } from "react";

const useTimeCalc = () => {
  const [resultText, setResultText] = useState("");

  // "HH:MM:SS" → 総秒数に変換する
  function toSeconds(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  }

  // timeA と timeB の大小比較
  function compareTimes(timeA, timeB) {
    return toSeconds(timeA) - toSeconds(timeB);
  }

  // timeA - timeB を「秒」で返す
  function diffInSeconds(timeA, timeB) {
    return toSeconds(timeA) - toSeconds(timeB);
  }

  function getCurrentTimeString() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  async function fetchData(location,station) {
    const nowStr = getCurrentTimeString(); // "HH:MM"

    // bus_departure_times
    // APIエンドポイントに現在時刻を付与してリクエスト
    const bus_api_url = `https://ait-busdiaa-api.onrender.com/next-three?time=${nowStr}`;
    const bus_response = await fetch(bus_api_url);
    const bus_data = await bus_response.json(); // バスの時刻データ
    // const bus_data = {next_three_times: ["13:15", "13:20", "13:30"],};

    // time-to-bus
    // グループIDの取得
    const group_response = await fetch(`http://127.0.0.1:9999//place/?lat=${location[0]}&lon=${location[1]}`);
    const group_data = await group_response.json();
    // トータルタイムの取得
    const time_response = await fetch(`http://127.0.0.1:9999//internal/?from=${group_data.location_id}&to=1`);
    const time_data = await time_response.json();
    // const time_data = { total_time: "300" };

    // train_depareure_time
    let next_train_url="";
    if(station === "kouzouzi"){
      next_train_url = `http://127.0.0.1:9999/api/aikann/yakusa_to_kouzouzi/next?time=${nowStr}`;
    }else{
      next_train_url = `http://127.0.0.1:9999/api/aikann/yakusa_to_okazaki/next?time=${nowStr}`;
    }
    const next_train_response = await fetch(next_train_url);
    const next_train_data = await next_train_response.json(); // 電車の時刻データ
    // const next_train_data = {
    //   next_time: "13:40:00",
    //   next_times: ["14:00:00", "14:20:00", "14:40:00"],
    // };


    // 電車時刻の結合
    const trainTimes = [
      next_train_data.next_time,
      ...next_train_data.next_times,
    ];

    // バス時刻
    const busTimes = bus_data.next_three_times;

    const walkSeconds = Number(time_data.total_time); // 徒歩時間 (秒単位)
    const busSeconds = 600; // バス移動 (秒単位)
    const nowSeconds = toSeconds(nowStr);

    let isTrainFound = false;

    for (const trainTime of trainTimes) {
      // 電車の出発時刻の秒数
      const trainSeconds = toSeconds(trainTime);

      // 電車出発時刻 - busSeconds (バス移動秒) より早いバスに乗れば間に合う
      const trainMinusBus = trainSeconds - busSeconds;

      // validBusTimes: この電車に間に合うバス時刻たち
      const validBusTimes = busTimes.filter((busTime) => {
        const busSeconds = toSeconds(busTime);
        // バス出発が trainMinusBus 以下であればOK
        return busSeconds <= trainMinusBus;
      });

      if (validBusTimes.length === 0) {
        continue; // 乗れるバスがないなら次の電車へ
      }

      // 使えるバスの中で一番遅いバスを選ぶ
      validBusTimes.sort((a, b) => compareTimes(a, b));
      const latestBus = validBusTimes[validBusTimes.length - 1];
      const latestBusSeconds = toSeconds(latestBus);

      // x = (バス出発時刻 - 現在時刻) - walkSeconds(徒歩)
      const timeToLeave = latestBusSeconds - nowSeconds - walkSeconds;

      // 時間が-2分以上なら次の電車へ
      if (timeToLeave < -120) {
        continue;
      }

      if (timeToLeave >= 0) {
        setResultText(`
          ${Math.floor(timeToLeave / 60)}
        `);
      } else {
        setResultText(`0`);
      }

      isTrainFound = true;
      break;
    }

    if (!isTrainFound) {
      setResultText("該当する電車が見つかりませんでした");
    }
  }

  return [resultText, { fetchData }];
};

export default useTimeCalc;
