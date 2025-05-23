function Taskbar({ time, onTimeClick }) {
  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <button>🪟 시작</button>
      </div>
      <div className="taskbar-right">
        <span style={{ cursor: "pointer" }} onClick={onTimeClick}>
          {time}
        </span>
      </div>
    </div>
  );
}
export default Taskbar;
