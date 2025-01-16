import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

const Timetable = (props) => {
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);

  const groupedTime = props.time.reduce((acc, t) => {
    const [hour, minute] = t.split(":"); // 時間と分を分割
    if (!acc[hour]) {
      acc[hour] = []; // 該当時間が初めての場合、配列を初期化
    }
    acc[hour].push(minute); // 分を追加
    return acc;
  }, {});
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
