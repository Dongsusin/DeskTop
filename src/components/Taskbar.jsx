import { useState } from "react";

function Taskbar({ time, onTimeClick }) {
  const [showShutdown, setShowShutdown] = useState(false);

  const handleStartClick = () => {
    setShowShutdown((prev) => !prev);
  };

  const handleShutdownClick = () => {
    // 사용자에게 확인을 요청한 뒤 창 닫기 시도
    const confirmExit = window.confirm("인터넷을 종료하시겠습니까?");
    if (confirmExit) {
      window.open("", "_self")?.close(); // 현재 창 닫기 시도
    }
  };

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        {showShutdown && (
          <button
            style={{
              position: "absolute",
              bottom: "55px",
              zIndex: 1000,
            }}
            onClick={handleShutdownClick}
          >
            종료
          </button>
        )}
        <button onClick={handleStartClick}>시작</button>
      </div>
      <div className="taskbar-right">
        <span
          className="todolist"
          style={{ cursor: "pointer" }}
          onClick={onTimeClick}
        >
          달력(todolist)
        </span>
        <span>{time}</span>
      </div>
    </div>
  );
}

export default Taskbar;
