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
import Music from "./Apps/Music/Music";
import ExchangeRate from "./Apps/ExchangeRate/ExchangeRate";
import Paint from "./Apps/PaintApp/PaintApp";
import BookApp from "./Apps/BookApp/BookApp";
import Travel from "./Apps/Travel/Travel";
import TicTacToe from "./Apps/TicTacToe/TicTacToe";
import MemoryGame from "./Apps/MemoryGame/MemoryGame";
import TurnBasedCardRPG from "./Apps/TurnBasedCardRPG/TurnBasedCardRPG";

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
  const [isResume, setIsResume] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [icons, setIcons] = useState([]);
  const [openFolder, setOpenFolder] = useState(null);
  const [currentPopup, setCurrentPopup] = useState(null);
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
  const [currentPage, setCurrentPage] = useState(0);
  const mobilePagesRef = useRef(null);
  const totalPages = 2;
  const clickSoundRef = useRef(null);
  const touchStartX = useRef(0);

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
    if (mobilePagesRef.current) {
      mobilePagesRef.current.style.transform = `translateX(-${
        currentPage * 50
      }%)`;
    }
  }, [currentPage]);

  useEffect(() => {
    clickSoundRef.current = new Audio("/sound/클릭.mp3");
  }, []);

  const openPopup = (title, component) => {
    setCurrentPopup({ title, component });
    clickSoundRef.current?.play();
  };

  const handleIconClick = (icon) => {
    const appMap = {
      "/calculator": { title: "계산기", component: <Calculator /> },
      "/weather": { title: "날씨", component: <Weather /> },
      "/map": { title: "지도", component: <Map /> },
      "/memo": { title: "메모장", component: <MemoApp /> },
      "/resume": { title: "이력서", component: <Resume /> },
      "/pokedex": { title: "PokeDex", component: <Pokedex /> },
      "/tetris": { title: "테트리스", component: <Tetris /> },
      "/speed": { title: "반응속도 테스트", component: <Speed /> },
      "/music": { title: "뮤직 플레이어", component: <Music /> },
      "/exchange": { title: "환율 정보", component: <ExchangeRate /> },
      "/paint": { title: "그림판", component: <Paint /> },
      "/book": { title: "도서 검색", component: <BookApp /> },
      "/travel": { title: "여행 정보", component: <Travel /> },
      "/tictactoe": { title: "틱택토", component: <TicTacToe /> },
      "/memory": { title: "카드 뒤집기", component: <MemoryGame /> },
      "/turncard": { title: "턴제 카드 RPG", component: <TurnBasedCardRPG /> },
    };

    if (icon.url && appMap[icon.url]) {
      openPopup(appMap[icon.url].title, appMap[icon.url].component);
    } else if (icon.type === "folder") {
      setOpenFolder(icon);
    } else if (icon.type === "unity") {
      if (!icon.url || !icon.name) {
        console.error("Unity icon에 url 또는 name 정보가 없습니다.");
        return;
      }
      const zipPath = icon.url.endsWith(".zip") ? icon.url : `${icon.url}.zip`;
      const link = document.createElement("a");
      link.href = `/path/${zipPath}`;
      link.download = `${icon.name}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (icon.url) {
      window.location.href = icon.url;
    }
  };

  const handleDateClick = (day) => {
    const key = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${day}`;
    setSelectedDate(key);
    setMemoInput(memos[key] || "");
    clickSoundRef.current?.play();
  };

  const handleSaveMemo = () => {
    const updated = { ...memos, [selectedDate]: memoInput };
    setMemos(updated);
    localStorage.setItem("calendarMemos", JSON.stringify(updated));
    setSelectedDate(null);
    clickSoundRef.current?.play();
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
    clickSoundRef.current?.play();
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
    clickSoundRef.current?.play();
  };

  const handleResume = () => {
    setIsResume(true);
    clickSoundRef.current?.play();
  };

  if (isIntro) {
    return (
      <div className="intro-screen">
        {!isResume ? (
          <div className="intro-Resume">
            <Resume />
            <button onClick={handleResume}>프로젝트 보기</button>
          </div>
        ) : !isLoading ? (
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

      <div
        className="mobile"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
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
        <MobileTopbar time={currentTime} />
        <MobileBottombar onCloseAll={handleCloseAll} />
      </div>

      <div>
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
