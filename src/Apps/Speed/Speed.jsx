import React, { useState, useRef } from "react";
import "./Speed.css";

function Speed() {
  const [status, setStatus] = useState("ready");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [reactionTime, setReactionTime] = useState(null);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    if (status === "ready") {
      setStatus("waiting");
      setMessage("초록색이 될 때까지 기다리세요...");

      const delay = Math.floor(Math.random() * 2000) + 2000;
      timeoutRef.current = setTimeout(() => {
        setStatus("now");
        setMessage("지금 클릭하세요!");
        startTimeRef.current = performance.now();
      }, delay);
    } else if (status === "waiting") {
      clearTimeout(timeoutRef.current);
      setStatus("ready");
      setMessage("너무 빨라요! 다시 시도하세요.");
    } else if (status === "now") {
      const endTime = performance.now();
      const diff = ((endTime - startTimeRef.current) / 1000).toFixed(2);
      setReactionTime(diff);
      setMessage(`당신의 반응 속도: ${diff}초`);
      setStatus("result");
    } else if (status === "result") {
      setStatus("ready");
      setReactionTime(null);
      setMessage("클릭해서 시작하세요");
    }
  };

  return (
    <div className={`speed-container ${status}`} onClick={handleClick}>
      <h1>반응 속도 테스트</h1>
      <p className="message">{message}</p>
      {reactionTime && <p className="retry">(클릭해서 다시 시작)</p>}
    </div>
  );
}

export default Speed;
