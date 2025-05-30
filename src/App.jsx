// 라이브러리 및 스타일/컴포넌트 임포트
import { useState, useEffect, useRef } from "react";
import "./App.css";

// 공통 UI 컴포넌트
import IconList from "./components/IconList";
import FolderPopup from "./components/Folder";
import Memo from "./components/Memo";
import Calendar from "./components/Calendar";
import Taskbar from "./components/Taskbar";
import MobileTopbar from "./components/Mobile-Topbar";
import MobileBottombar from "./components/Mobile-Bottombar";

// 앱 컴포넌트
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
import Paint from "./Apps/PaintApp/PaintApp";
import BookApp from "./Apps/BookApp/BookApp";
import Travel from "./Apps/Travel/Travel";
import TicTacToe from "./Apps/TicTacToe/TicTacToe";
import MemoryGame from "./Apps/MemoryGame/MemoryGame";
import TurnBasedCardRPG from "./Apps/TurnBasedCardRPG/TurnBasedCardRPG";

// 팝업 UI 컴포넌트
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

// 메인 데스크톱 앱 컴포넌트
function DesktopApp() {
  // 상태 변수들
  const [isIntro, setIsIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  // 아이콘 데이터 불러오기
  useEffect(() => {
    fetch("/data/iconsdata.json")
      .then((res) => res.json())
      .then(setIcons)
      .catch(console.error);
  }, []);

  // 모바일 페이지 전환 처리
  useEffect(() => {
    if (mobilePagesRef.current) {
      mobilePagesRef.current.style.transform = `translateX(-${
        currentPage * 50
      }%)`;
    }
  }, [currentPage]);

  // 클릭 사운드 오디오 로드
  useEffect(() => {
    clickSoundRef.current = new Audio("/sound/클릭.mp3");
  }, []);

  // 공통 팝업 열기 함수
  const openPopup = (title, component) => {
    setCurrentPopup({ title, component });
    clickSoundRef.current?.play();
  };

  // 아이콘 클릭 핸들러
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
      "/maple": { title: "메이플 위키", component: <Maple /> },
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
    } else if (icon.url) {
      window.location.href = icon.url;
    }
  };

  // 날짜 클릭 시 메모 보기
  const handleDateClick = (day) => {
    const key = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${day}`;
    setSelectedDate(key);
    setMemoInput(memos[key] || "");
    clickSoundRef.current?.play();
  };

  // 메모 저장
  const handleSaveMemo = () => {
    const updated = { ...memos, [selectedDate]: memoInput };
    setMemos(updated);
    localStorage.setItem("calendarMemos", JSON.stringify(updated));
    setSelectedDate(null);
    clickSoundRef.current?.play();
  };

  // 모바일 스와이프 제스처 처리
  const handleSwipe = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "left" && prev < totalPages - 1) return prev + 1;
      if (direction === "right" && prev > 0) return prev - 1;
      return prev;
    });
  };

  // 팝업/폴더/메모 모두 닫기
  const handleCloseAll = () => {
    setCurrentPopup(null);
    setOpenFolder(null);
    setSelectedDate(null);
    clickSoundRef.current?.play();
  };

  // 인트로 화면 → 로딩 → 데스크탑 시작
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

  // 인트로 화면
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

  // 데스크탑 UI
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

      {/* 모바일 UI */}
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

      {/* 팝업/폴더/메모 */}
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
