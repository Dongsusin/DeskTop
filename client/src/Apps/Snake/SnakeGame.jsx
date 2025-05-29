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
  const [ranking, setRanking] = useState([]);
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
      if (newDir) {
        setNextDirection(newDir);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/rankings")
      .then((res) => res.json())
      .then((data) => setRanking(data))
      .catch((err) => console.error("랭킹 불러오기 실패:", err));
  }, []);

  useEffect(() => {
    if (isGameOver) {
      const username = prompt("게임 오버! 이름을 입력하세요:");
      if (username) submitScore(username, score);
    }
  }, [isGameOver]);

  const submitScore = (username, score) => {
    fetch("http://localhost:3001/rankings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, score }),
    })
      .then((res) => res.json())
      .then((data) => setRanking(data))
      .catch((err) => console.error("점수 저장 실패:", err));
  };

  function moveSnake() {
    if (isGameOverRef.current) return;

    const newHead = {
      x: snake[0].x + nextDirectionRef.current.x,
      y: snake[0].y + nextDirectionRef.current.y,
    };

    if (
      newHead.x < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y < 0 ||
      newHead.y >= BOARD_SIZE ||
      snake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      )
    ) {
      gameOverSoundRef.current?.play();
      setIsGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      eatSoundRef.current?.play();
      setFood(randomFood(newSnake));
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    setDirection(nextDirectionRef.current);
  }

  function randomFood(snake) {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      if (
        !snake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      ) {
        break;
      }
    }
    return newFood;
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setFood(randomFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    setScreen("game");
  }

  return (
    <div className="snake-game">
      {screen === "intro" && (
        <div className="intro">
          <h1>🐍 Snake Game</h1>
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
          <button onClick={resetGame}>게임 시작</button>
          <h2>🏆 랭킹</h2>
          <ol>
            {ranking.map((r, idx) => (
              <li key={idx}>
                {r.username} - {r.score}점
              </li>
            ))}
          </ol>
        </div>
      )}
      {screen === "game" && (
        <div className="board">
          {Array.from({ length: BOARD_SIZE }).map((_, y) => (
            <div className="row" key={y}>
              {Array.from({ length: BOARD_SIZE }).map((_, x) => {
                const isSnake = snake.some((s) => s.x === x && s.y === y);
                const isFood = food.x === x && food.y === y;
                return (
                  <div
                    key={x}
                    className={`cell ${isSnake ? "snake" : ""} ${
                      isFood ? "food" : ""
                    }`}
                  />
                );
              })}
            </div>
          ))}
          <div className="score">점수: {score}</div>
          {isGameOver && <div className="game-over">게임 오버!</div>}
        </div>
      )}
      <audio ref={eatSoundRef} src="/sounds/eat.mp3" />
      <audio ref={gameOverSoundRef} src="/sounds/gameover.mp3" />
    </div>
  );
}
