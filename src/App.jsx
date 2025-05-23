// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import IconList from "./components/IconList";
import Folder from "./components/Folder";
import Memo from "./components/Memo";
import Calendar from "./components/Calendar";
import Taskbar from "./components/Taskbar";
import Calculator from "./Apps/Calculator/Calculator";
import Weather from "./Apps/Weather/Weather";
import Map from "./Apps/Map/Map";
import MemoApp from "./Apps/Memo/Memo";
import Resume from "./Apps/Resume/Resume";

function DesktopApp() {
  const [icons, setIcons] = useState([]);
  const [openFolder, setOpenFolder] = useState(null);
  const [currentDate] = useState(new Date());
  const [memos, setMemos] = useState(
    () => JSON.parse(localStorage.getItem("calendarMemos")) || {}
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [memoInput, setMemoInput] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("/data/iconsdata.json")
      .then((res) => res.json())
      .then(setIcons)
      .catch(console.error);
  }, []);

  const handleIconClick = (icon) => {
    if (icon.type === "icon" && icon.url === "/calculator") {
      setShowCalculator(true);
    } else if (icon.type === "icon" && icon.url === "/weather") {
      setShowWeather(true);
    } else if (icon.type === "icon" && icon.url === "/map") {
      setShowMap(true);
    } else if (icon.type === "icon" && icon.url === "/memo") {
      setShowMemo(true);
    } else if (icon.type === "icon" && icon.url === "/resume") {
      setShowResume(true);
    } else if (icon.type === "folder") {
      setOpenFolder(icon);
    } else {
      window.location.href = icon.url;
    }
  };

  const handleDateClick = (day) => {
    const key = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${day}`;
    setSelectedDate(key);
    setMemoInput(memos[key] || "");
  };

  const handleSaveMemo = () => {
    const updated = { ...memos, [selectedDate]: memoInput };
    setMemos(updated);
    localStorage.setItem("calendarMemos", JSON.stringify(updated));
    setSelectedDate(null);
  };

  return (
    <>
      <div className="desktop split-layout">
        <div className="left-pane">
          <IconList icons={icons} onIconClick={handleIconClick} />
        </div>

        <div className="right-pane">
          {showCalendar && (
            <Calendar
              currentDate={currentDate}
              memos={memos}
              onDateClick={handleDateClick}
            />
          )}
        </div>

        {openFolder && (
          <Folder folder={openFolder} onClose={() => setOpenFolder(null)} />
        )}

        {selectedDate && (
          <Memo
            selectedDate={selectedDate}
            memoInput={memoInput}
            onChange={setMemoInput}
            onSave={handleSaveMemo}
            onClose={() => setSelectedDate(null)}
          />
        )}

        {showCalculator && (
          <div className="popup">
            <div className="popup-header">
              <span>계산기</span>
              <button onClick={() => setShowCalculator(false)}>닫기 ✖</button>
            </div>
            <Calculator />
          </div>
        )}

        {showWeather && (
          <div className="popup">
            <div className="popup-header">
              <span>날씨</span>
              <button onClick={() => setShowWeather(false)}>닫기 ✖</button>
            </div>
            <Weather />
          </div>
        )}

        {showMap && (
          <div className="popup">
            <div className="popup-header">
              <span>지도</span>
              <button onClick={() => setShowMap(false)}>닫기 ✖</button>
            </div>
            <Map />
          </div>
        )}

        {showMemo && (
          <div className="popup">
            <div className="popup-header">
              <span>메모장</span>
              <button onClick={() => setShowMemo(false)}>닫기 ✖</button>
            </div>
            <MemoApp />
          </div>
        )}

        {showResume && (
          <div className="popup">
            <div className="popup-header">
              <span>이력서</span>
              <button onClick={() => setShowResume(false)}>닫기 ✖</button>
            </div>
            <Resume />
          </div>
        )}
      </div>

      <Taskbar
        time={currentTime}
        onTimeClick={() => setShowCalendar((prev) => !prev)}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <DesktopApp />
    </Router>
  );
}

export default App;
