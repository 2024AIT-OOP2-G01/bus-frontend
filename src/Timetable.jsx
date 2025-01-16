import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const Timetable = (props) => {
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
//   const time = [
//     "5:55", "6:23", "6:40", "6:56", "7:12", "7:28", "7:45",
//     "8:01", "8:17", "8:33", "8:49", "9:05", "9:21", "9:37",
//     "9:53", "10:09", "10:26", "10:48", "10:57", "11:20", "11:37",
//     "11:53", "12:09", "12:25", "12:41", "12:57", "13:13", "13:29",
//     "13:45", "14:01", "14:17", "14:33", "14:49", "15:05", "15:21",
//     "15:37", "15:53", "16:09", "16:25", "16:41", "16:57", "17:13",
//     "17:29", "17:45", "18:01", "18:17", "18:33", "18:49", "19:05",
//     "19:21", "19:37", "19:53", "20:09", "20:25", "20:41", "20:57",
//     "21:13", "21:29", "21:45", "22:01", "22:23", "22:39", "22:56",
//     "23:21", "23:40",
    
// ];

//   if (props.where_to_go == "kouzouzi"){
//      let api_url = 'http://127.0.0.1:9999/api/aikann/yakusa_to_kouzouzi';
//   }
//
//   useEffect(() => {
//     // FlaskのAPIを取得
//     fetch(api_url)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => setTimetable(data))
//       .catch((err) => setError(err.message));
//   }, []);

const groupedTime = props.time.reduce((acc, t) => {
    const [hour, minute] = t.split(":"); // 時間と分を分割
    if (!acc[hour]) {
      acc[hour] = []; // 該当時間が初めての場合、配列を初期化
    }
    acc[hour].push(minute); // 分を追加
    return acc;
  }, {});

  const TableWrapper = styled.div`
    display: flex;
    justify-content: center;
    
  `;

  const StyleTimeTable = styled.table`
    font-size: 1.4em;
    font-weight: 500;
    color: #031322;
  `;

  const StyleTd = styled.td`
    text-align: left;
  `;

  const StyledTr = styled.tr`
    &:nth-of-type(even) {
        background-color: #e6e6e6; /* 偶数行の背景色を変更 */
    }
  `;

  console.log("groupedTime" , groupedTime);
  

  return (
    <>
    <h1>{props.title} 時刻表</h1>
    <TableWrapper>
      <StyleTimeTable border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          {Object.entries(groupedTime).map(([hour, minutes]) => (
            <StyledTr Key={hour}>
              <td>{hour}</td>
              <StyleTd>{minutes.join("   ")}</StyleTd>
            </StyledTr>
          ))}
        </tbody>
      </StyleTimeTable>
    </TableWrapper>
    </>
  );
};

export default Timetable;