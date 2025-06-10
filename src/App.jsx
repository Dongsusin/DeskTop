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
import Tetris from "./Apps/Tetris/Tetris";
import Speed from "./Apps/Speed/Speed";
import Paint from "./Apps/PaintApp/PaintApp";
import TicTacToe from "./Apps/TicTacToe/TicTacToe";
import MemoryGame from "./Apps/MemoryGame/MemoryGame";
import TurnBasedCardRPG from "./Apps/TurnBasedCardRPG/TurnBasedCardRPG";

// 팝업창 컴포넌트
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
  // 인트로 화면 표시
  const [isIntro, setIsIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 아이콘 리스트
  const [icons, setIcons] = useState([]);

  // 폴더와 팝업 정보
  const [openFolder, setOpenFolder] = useState(null);
  const [currentPopup, setCurrentPopup] = useState(null);

  // 현재 날짜 및 메모 상태
  const [currentDate] = useState(new Date());
  const [memos, setMemos] = useState(
    () => JSON.parse(localStorage.getItem("calendarMemos")) || {}
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [memoInput, setMemoInput] = useState("");

  // 시간
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [showCalendar, setShowCalendar] = useState(false);

  // 모바일 페이지 슬라이드
  const [currentPage, setCurrentPage] = useState(0);
  const mobilePagesRef = useRef(null);
  const totalPages = 2;

  // 사운드
  const clickSoundRef = useRef(null);
  const touchStartX = useRef(0);

  // 시간 업데이트
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  // 아이콘 정보 불러오기
  useEffect(() => {
    fetch("/data/iconsdata.json")
      .then((res) => res.json())
      .then(setIcons)
      .catch(console.error);
  }, []);

  // 모바일 페이지 슬라이드 애니메이션
  useEffect(() => {
    if (mobilePagesRef.current) {
      mobilePagesRef.current.style.transform = `translateX(-${
        currentPage * 50
      }%)`;
    }
  }, [currentPage]);

  // 클릭 사운드
  useEffect(() => {
    clickSoundRef.current = new Audio("/sound/클릭.mp3");
  }, []);

  // 앱 아이콘 클릭 시 팝업 열기
  const openPopup = (title, component) => {
    setCurrentPopup({ title, component });
    clickSoundRef.current?.play();
  };

  // 아이콘 클릭 처리
  const handleIconClick = (icon) => {
    const appMap = {
      "/calculator": { title: "계산기", component: <Calculator /> },
      "/weather": { title: "날씨", component: <Weather /> },
      "/map": { title: "지도", component: <Map /> },
      "/memo": { title: "메모장", component: <MemoApp /> },
      "/tetris": { title: "테트리스", component: <Tetris /> },
      "/speed": { title: "반응속도 테스트", component: <Speed /> },
      "/paint": { title: "그림판", component: <Paint /> },
      "/tictactoe": { title: "틱택토", component: <TicTacToe /> },
      "/memory": { title: "카드 뒤집기", component: <MemoryGame /> },
      "/turncard": { title: "턴제 카드 RPG", component: <TurnBasedCardRPG /> },
    };

    if (icon.url && appMap[icon.url]) {
      openPopup(appMap[icon.url].title, appMap[icon.url].component);
    } else if (icon.type === "folder") {
      setOpenFolder(icon);
    } else if (icon.type === "unity") {
      // Unity 앱은 zip 파일 다운로드
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
      // 일반 외부 링크로 이동
      window.location.href = icon.url;
    }
  };

  // 날짜 클릭 시 메모 입력창 열기
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

  // 모바일에서 좌우 스와이프 처리
  const handleSwipe = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "left" && prev < totalPages - 1) return prev + 1;
      if (direction === "right" && prev > 0) return prev - 1;
      return prev;
    });
  };

  // 모든 팝업 닫기
  const handleCloseAll = () => {
    setCurrentPopup(null);
    setOpenFolder(null);
    setSelectedDate(null);
    clickSoundRef.current?.play();
  };

  // 인트로 화면에서 시작 버튼 클릭 시 로딩 처리
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

  // 인트로 화면 렌더링
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

  // 데스크탑/모바일 UI 렌더링
  return (
    <div className="all">
      {/* 데스크탑 화면 */}
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

      {/* 모바일 화면 */}
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

      {/* 팝업 및 모달 영역 */}
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
