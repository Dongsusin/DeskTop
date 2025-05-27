import React, { useState, useEffect, useRef } from "react";
import "./SnakeGame.css";

const BOARD_SIZE = 10;
const INITIAL_SNAKE = [{ x: 4, y: 4 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(randomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const moveRef = useRef();

  useEffect(() => {
    moveRef.current = moveSnake;
  });

  useEffect(() => {
    const interval = setInterval(() => moveRef.current(), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  function moveSnake() {
    if (isGameOver) return;

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
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
      return;
    }

    const newSnake = [newHead, ...snake];
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 1);
      setFood(randomFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setScore(0);
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

  return (
    <div className="SnakeGame">
      <h1>Snake Game</h1>
      <div className="score">점수: {score}</div>
      <div className="board">
        {[...Array(BOARD_SIZE)].map((_, y) =>
          [...Array(BOARD_SIZE)].map((_, x) => renderCell(x, y))
        )}
      </div>
      {isGameOver && <div className="game-over">게임 오버!</div>}
      <button className="reset" onClick={resetGame}>
        다시 시작
      </button>
    </div>
  );
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
