import React, { useState, useEffect, useRef } from "react";
import "./SnakeGame.css";

const BOARD_SIZE = 10;
const INITIAL_SNAKE = [{ x: 4, y: 4 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEEDS = {
  쉬움: 700,
  보통: 500,
  어려움: 300,
};

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(randomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState("보통");
  const [screen, setScreen] = useState("intro");
  const [ranking, setRanking] = useState(() => {
    const saved = localStorage.getItem("snakeRanking");
    return saved ? JSON.parse(saved) : [];
  });
  const [nextDirection, setNextDirection] = useState(direction);

  const moveRef = useRef();
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(nextDirection);
  const isGameOverRef = useRef(isGameOver);

  const eatSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    nextDirectionRef.current = nextDirection;
  }, [nextDirection]);

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  useEffect(() => {
    moveRef.current = moveSnake;
  });

  useEffect(() => {
    if (screen !== "game") return;

    const interval = setInterval(() => {
      moveRef.current();
    }, SPEEDS[gameSpeed]);

    return () => clearInterval(interval);
  }, [screen, gameSpeed]);

  useEffect(() => {
    const handleKey = (e) => {
      let newDir = null;
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current.y === 0) newDir = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (directionRef.current.y === 0) newDir = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (directionRef.current.x === 0) newDir = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (directionRef.current.x === 0) newDir = { x: 1, y: 0 };
          break;
        default:
          break;
      }
      if (newDir) setNextDirection(newDir);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (screen !== "game") return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30 && directionRef.current.x === 0) {
          setNextDirection({ x: 1, y: 0 });
        } else if (dx < -30 && directionRef.current.x === 0) {
          setNextDirection({ x: -1, y: 0 });
        }
      } else {
        if (dy > 30 && directionRef.current.y === 0) {
          setNextDirection({ x: 0, y: 1 });
        } else if (dy < -30 && directionRef.current.y === 0) {
          setNextDirection({ x: 0, y: -1 });
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [screen]);

  function moveSnake() {
    if (isGameOverRef.current) return;

    const dir = nextDirectionRef.current;
    if (
      dir.x !== -directionRef.current.x ||
      dir.y !== -directionRef.current.y
    ) {
      setDirection(dir);
    }

    const newHead = {
      x: snake[0].x + dir.x,
      y: snake[0].y + dir.y,
    };

    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y >= BOARD_SIZE ||
      snake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      )
    ) {
      setIsGameOver(true);
      if (gameOverSoundRef.current) gameOverSoundRef.current.play();
      updateRanking(score);
      return;
    }

    const newSnake = [newHead, ...snake];
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((s) => s + 1);
      if (eatSoundRef.current) eatSoundRef.current.play();
      setFood(randomFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function updateRanking(newScore) {
    if (newScore === 0) return;
    const newRanking = [...ranking, newScore].sort((a, b) => b - a).slice(0, 5);
    setRanking(newRanking);
    localStorage.setItem("snakeRanking", JSON.stringify(newRanking));
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setFood(randomFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setScore(0);
  }

  function startGame() {
    resetGame();
    setScreen("game");
  }

  function showRanking() {
    setScreen("ranking");
  }

  function backToIntro() {
    setScreen("intro");
  }

  function directionToString(dir) {
    if (dir.x === 1) return "→";
    if (dir.x === -1) return "←";
    if (dir.y === 1) return "↓";
    if (dir.y === -1) return "↑";
    return "";
  }

  function renderCell(x, y) {
    const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
    const isHead = snake[0].x === x && snake[0].y === y;
    const isFood = food.x === x && food.y === y;

    return (
      <div
        key={`${x}-${y}`}
        className={`cell ${
          isSnake ? (isHead ? "head" : "body") : isFood ? "food" : ""
        }`}
      />
    );
  }

  if (screen === "intro") {
    return (
      <div className="SnakeGame intro">
        <h1>스네이크 게임</h1>

        <div>
          <label>
            난이도:
            <select
              value={gameSpeed}
              onChange={(e) => setGameSpeed(e.target.value)}
            >
              {Object.keys(SPEEDS).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button onClick={startGame}>게임 시작</button>
        <button onClick={showRanking}>랭킹 보기</button>
      </div>
    );
  } else if (screen === "ranking") {
    return (
      <div className="SnakeGame ranking">
        <h2>랭킹 보드 (상위 5점)</h2>
        <ol>
          {ranking.length === 0 && <li>아직 기록이 없습니다.</li>}
          {ranking.map((score, idx) => (
            <li key={idx}>{score} 점</li>
          ))}
        </ol>
        <button onClick={backToIntro}>뒤로 가기</button>
      </div>
    );
  }

  return (
    <div className="SnakeGame">
      <h1>Snake Game</h1>
      <div className="score">점수: {score}</div>
      <div className="direction-indicator">
        방향: {directionToString(nextDirection)}
      </div>
      <div className="board">
        {[...Array(BOARD_SIZE)]
          .map((_, y) => [...Array(BOARD_SIZE)].map((_, x) => renderCell(x, y)))
          .flat()}
      </div>

      <div className="mobile-controls">
        <div>
          <button onClick={() => tryChangeDirection({ x: 0, y: -1 })}>↑</button>
        </div>
        <div>
          <button onClick={() => tryChangeDirection({ x: -1, y: 0 })}>←</button>
          <button onClick={() => tryChangeDirection({ x: 1, y: 0 })}>→</button>
        </div>
        <div>
          <button onClick={() => tryChangeDirection({ x: 0, y: 1 })}>↓</button>
        </div>
      </div>
      {isGameOver && <div className="game-over">게임 오버!</div>}
      <button className="reset" onClick={resetGame}>
        다시 시작
      </button>

      <audio
        ref={eatSoundRef}
        src="/sound/게임/먹기-스네이크.mp3"
        preload="auto"
      />
      <audio
        ref={gameOverSoundRef}
        src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
        preload="auto"
      />
    </div>
  );

  function tryChangeDirection(newDir) {
    if (
      (newDir.x !== -direction.x || newDir.y !== -direction.y) &&
      (direction.x === 0 || direction.y === 0)
    ) {
      setNextDirection(newDir);
    }
  }
}

function randomFood(snake) {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (
    snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
  );
  return newFood;
}
