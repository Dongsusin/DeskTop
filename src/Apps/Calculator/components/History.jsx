import React from "react";

const History = ({ history }) => (
  <div className="history">
    <h3>연산 기록</h3>
    <ul>
      {history.length === 0 && <li>기록이 없습니다.</li>}
      {history.map((item, idx) => (
        <li key={idx}>
          <span>{item.expr} = </span>
          <strong>{item.res}</strong>
        </li>
      ))}
    </ul>
  </div>
);

export default History;
