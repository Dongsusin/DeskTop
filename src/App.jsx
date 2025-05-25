// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import IconList from "./components/IconList";
import FolderPopup from "./components/Folder";
import Memo from "./components/Memo";
import Calendar from "./components/Calendar";
import Taskbar from "./components/Taskbar";
import Calculator from "./Apps/Calculator/Calculator";
import Weather from "./Apps/Weather/Weather";
import Map from "./Apps/Map/Map";
import MemoApp from "./Apps/Memo/Memo";
import Resume from "./Apps/Resume/Resume";
import Pokedex from "./Apps/pokedex/pokedex";
import Tetris from "./Apps/Tetris/Tetris";
import Speed from "./Apps/Speed/Speed";
import Maple from "./Apps/Maple/Maple";
import Music from "./Apps/Music/Music";
import ExchangeRate from "./Apps/ExchangeRate/ExchangeRate";
import Coin from "./Apps/CoinInfo/CoinInfo";
import StockInfo from "./Apps/StockInfo/StockInfo";
import Filght from "./Apps/FlightApp/FlightApp";

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
  const [showPokeDex, setShowPokedex] = useState(false);
  const [showTetris, setShowTetris] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);
  const [showMaple, setShowMaple] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showExchangeRate, setShowExchangeRate] = useState(false);
  const [showCoin, setShowCoin] = useState(false);
  const [showStockInfo, setShowStockInfo] = useState(false);
  const [showFilght, setShowFilght] = useState(false);

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
    if (icon.url === "/calculator") {
      setShowCalculator(true);
    } else if (icon.url === "/weather") {
      setShowWeather(true);
    } else if (icon.url === "/map") {
      setShowMap(true);
    } else if (icon.url === "/memo") {
      setShowMemo(true);
    } else if (icon.url === "/resume") {
      setShowResume(true);
    } else if (icon.url === "/pokedex") {
      setShowPokedex(true);
    } else if (icon.url === "/tetris") {
      setShowTetris(true);
    } else if (icon.url === "/speed") {
      setShowSpeed(true);
    } else if (icon.url === "/maple") {
      setShowMaple(true);
    } else if (icon.url === "/music") {
      setShowMusic(true);
    } else if (icon.url === "/exchange") {
      setShowExchangeRate(true);
    } else if (icon.url === "/coin") {
      setShowCoin(true);
    } else if (icon.url === "/stock") {
      setShowStockInfo(true);
    } else if (icon.url === "/flight") {
      setShowFilght(true);
    } else if (icon.url && icon.url !== "") {
      window.location.href = icon.url;
    } else if (icon.type === "folder") {
      setOpenFolder(icon);
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
      <div className="desktop">
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
          <FolderPopup
            folder={openFolder}
            onClose={() => setOpenFolder(null)}
            onIconClick={(icon) => {
              handleIconClick(icon);
              setOpenFolder(null);
            }}
          />
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

        {showPokeDex && (
          <div className="popup">
            <div className="popup-header">
              <span>PokeDex</span>
              <button onClick={() => setShowPokedex(false)}>닫기 ✖</button>
            </div>
            <Pokedex />
          </div>
        )}

        {showTetris && (
          <div className="popup">
            <div className="popup-header">
              <span>테트리스</span>
              <button onClick={() => setShowTetris(false)}>닫기 ✖</button>
            </div>
            <Tetris />
          </div>
        )}

        {showSpeed && (
          <div className="popup">
            <div className="popup-header">
              <span>반응속도 테스트</span>
              <button onClick={() => setShowSpeed(false)}>닫기 ✖</button>
            </div>
            <Speed />
          </div>
        )}

        {showMaple && (
          <div className="popup">
            <div className="popup-header">
              <span>메이플 위키</span>
              <button onClick={() => setShowMaple(false)}>닫기 ✖</button>
            </div>
            <Maple />
          </div>
        )}

        {showMusic && (
          <div className="popup">
            <div className="popup-header">
              <span>뮤직 플레이어</span>
              <button onClick={() => setShowMusic(false)}>닫기 ✖</button>
            </div>
            <Music />
          </div>
        )}

        {showExchangeRate && (
          <div className="popup">
            <div className="popup-header">
              <span>환률 정보</span>
              <button onClick={() => setShowExchangeRate(false)}>닫기 ✖</button>
            </div>
            <ExchangeRate />
          </div>
        )}

        {showCoin && (
          <div className="popup">
            <div className="popup-header">
              <span>코인 정보</span>
              <button onClick={() => setShowCoin(false)}>닫기 ✖</button>
            </div>
            <Coin />
          </div>
        )}

        {showStockInfo && (
          <div className="popup">
            <div className="popup-header">
              <span>주식 정보</span>
              <button onClick={() => setShowStockInfo(false)}>닫기 ✖</button>
            </div>
            <StockInfo />
          </div>
        )}

        {showFilght && (
          <div className="popup">
            <div className="popup-header">
              <span>항공편 정보</span>
              <button onClick={() => setShowFilght(false)}>닫기 ✖</button>
            </div>
            <Filght />
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
