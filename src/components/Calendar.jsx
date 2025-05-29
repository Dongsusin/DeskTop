function Calendar({ currentDate, memos, onDateClick }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div className="day empty" key={`e${i}`}></div>);
  }

  for (let i = 1; i <= lastDate; i++) {
    const dateKey = `${year}-${month + 1}-${i}`;
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === i;

    days.push(
      <div
        className={`day ${isToday ? "today" : ""}`}
        key={i}
        onClick={() => onDateClick(i)}
      >
        <div>{i}</div>
        {memos[dateKey] && <div className="memo-preview">{memos[dateKey]}</div>}
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-header">{`${year}년 ${month + 1}월`}</div>
      <div className="calendar-grid">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div className="day header" key={d}>
            {d}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
}
export default Calendar;
