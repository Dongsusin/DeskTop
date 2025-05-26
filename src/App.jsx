import { useState, useEffect, useRef } from "react";
import "./App.css";
import IconList from "./components/IconList";
import FolderPopup from "./components/Folder";
import Memo from "./components/Memo";
import Calendar from "./components/Calendar";
import Taskbar from "./components/Taskbar";
import MobileTopbar from "./components/Mobile-Topbar";
import MobileBottombar from "./components/Mobile-Bottombar";
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
import Flight from "./Apps/FlightApp/FlightApp";
import Seven from "./Apps/Seven/Seven";
import Paint from "./Apps/PaintApp/PaintApp";
import News from "./Apps/News/News";
import BookApp from "./Apps/BookApp/BookApp";
import Travel from "./Apps/Travel/Travel";

function Popup({ title, onClose, children }) {
  return (
    <div className="popup">
      <div className="popup-header">
        <span>{title}</span>
        <button onClick={onClose}>닫기 ✖</button>
      </div>
      {children}
    </div>
  );
}

function DesktopApp() {
  const [isIntro, setIsIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
  const [currentPage, setCurrentPage] = useState(0);
  const mobilePagesRef = useRef(null);
  const totalPages = 2;
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(null);
  const handleTouchStart = useRef(null);
  const handleTouchEnd = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  useEffect(() => {
    const container = mobilePagesRef.current;
    if (container) {
      container.style.transform = `translateX(-${currentPage * 50}%)`;
    }
  }, [currentPage]);

  const handleIconClick = (icon) => {
    switch (icon.url) {
      case "/calculator":
        setCurrentPopup({ title: "계산기", component: <Calculator /> });
        break;
      case "/weather":
        setCurrentPopup({ title: "날씨", component: <Weather /> });
        break;
      case "/map":
        setCurrentPopup({ title: "지도", component: <Map /> });
        break;
      case "/memo":
        setCurrentPopup({ title: "메모장", component: <MemoApp /> });
        break;
      case "/resume":
        setCurrentPopup({ title: "이력서", component: <Resume /> });
        break;
      case "/pokedex":
        setCurrentPopup({ title: "PokeDex", component: <Pokedex /> });
        break;
      case "/tetris":
        setCurrentPopup({ title: "테트리스", component: <Tetris /> });
        break;
      case "/speed":
        setCurrentPopup({ title: "반응속도 테스트", component: <Speed /> });
        break;
      case "/maple":
        setCurrentPopup({ title: "메이플 위키", component: <Maple /> });
        break;
      case "/music":
        setCurrentPopup({ title: "뮤직 플레이어", component: <Music /> });
        break;
      case "/exchange":
        setCurrentPopup({ title: "환율 정보", component: <ExchangeRate /> });
        break;
      case "/coin":
        setCurrentPopup({ title: "코인 시세", component: <Coin /> });
        break;
      case "/stock":
        setCurrentPopup({ title: "주식 정보", component: <StockInfo /> });
        break;
      case "/flight":
        setCurrentPopup({ title: "항공편 정보", component: <Flight /> });
        break;
      case "/seven":
        setCurrentPopup({ title: "세븐나이츠", component: <Seven /> });
        break;
      case "/paint":
        setCurrentPopup({ title: "그림판", component: <Paint /> });
        break;
      case "/news":
        setCurrentPopup({ title: "뉴스", component: <News /> });
        break;
      case "/book":
        setCurrentPopup({ title: "도서 검색", component: <BookApp /> });
        break;
      case "/travel":
        setCurrentPopup({ title: "여행 정보", component: <Travel /> });
        break;
      default:
        if (icon.url) window.location.href = icon.url;
        else if (icon.type === "folder") setOpenFolder(icon);
        break;
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

  const handleSwipe = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "left" && prev < totalPages - 1) return prev + 1;
      if (direction === "right" && prev > 0) return prev - 1;
      return prev;
    });
  };

  const handleCloseAll = () => {
    setCurrentPopup(null);
    setOpenFolder(null);
    setSelectedDate(null);
  };

  const handleStart = () => {
    setIsLoading(true);
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsIntro(false);
            setIsLoading(false);
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  if (isIntro) {
    return (
      <div className="intro-screen">
        {!isLoading ? (
          <div>
            <button className="power-button" onClick={handleStart}></button>
            <p>전원을 클릭하세요</p>
          </div>
        ) : (
          <div className="loading-container">
            <div className="loading-text">로딩 중... {loadingProgress}%</div>
            <div className="loading-bar">
              <div
                className="loading-fill"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="all">
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
        <Taskbar
          time={currentTime}
          onTimeClick={() => setShowCalendar((prev) => !prev)}
        />
      </div>

      <div className="mobile">
        <div
          className="mobile-container"
          onTouchStart={(e) =>
            (handleTouchStart.current = e.touches[0].clientX)
          }
          onTouchEnd={(e) => {
            handleTouchEnd.current = e.changedTouches[0].clientX;
            const diff = handleTouchStart.current - handleTouchEnd.current;
            if (diff > 50) handleSwipe("left");
            else if (diff < -50) handleSwipe("right");
          }}
        >
          <div className="mobile-pages" ref={mobilePagesRef}>
            <div className="mobile-page">
              <IconList icons={icons} onIconClick={handleIconClick} />
            </div>
            <div className="mobile-page">
              <Calendar
                currentDate={currentDate}
                memos={memos}
                onDateClick={handleDateClick}
              />
            </div>
          </div>
        </div>
        <MobileTopbar time={currentTime} />
        <MobileBottombar onCloseAll={handleCloseAll} />
      </div>

      <div className="popup-content">
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

        {currentPopup && (
          <Popup
            title={currentPopup.title}
            onClose={() => setCurrentPopup(null)}
          >
            {currentPopup.component}
          </Popup>
        )}
      </div>
    </div>
  );
}

export default DesktopApp;
