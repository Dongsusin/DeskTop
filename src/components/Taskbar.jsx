function Taskbar({ time, onTimeClick }) {
  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <button>🪟 시작</button>
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
