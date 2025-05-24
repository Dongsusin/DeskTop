import React, { useState, useEffect, useRef } from "react";
import "./Tetris.css";

const ROWS = 10;
const COLS = 10;
const BLOCK_SIZE = 30;

// 테트리스 블록 모양 (4x4 격자 기준)
const SHAPES = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
  O: [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
  T: [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  Z: [
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  J: [
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
  ],
  L: [
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  ],
};

const COLORS = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  S: "green",
  Z: "red",
  J: "blue",
  L: "orange",
};

function randomShape() {
  const keys = Object.keys(SHAPES);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  return { type: rand, rotation: 0, shape: SHAPES[rand][0] };
}

function Tetris() {
  // 보드 상태 초기화
  const emptyBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  const [board, setBoard] = useState(emptyBoard);
  const [current, setCurrent] = useState({
    ...randomShape(),
    x: 3,
    y: 0,
  });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gameRef = useRef();

  // 충돌 검사 함수
  function isValidPosition(shape, x, y) {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newX = x + c;
          const newY = y + r;
          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && board[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // 현재 블록을 보드에 고정시키기
  function fixToBoard() {
    const newBoard = board.map((row) => row.slice());
    const { shape, x, y, type } = current;
    shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          const boardY = y + r;
          const boardX = x + c;
          if (boardY >= 0) newBoard[boardY][boardX] = type;
        }
      });
    });
    setBoard(newBoard);
    clearLines(newBoard);
  }

  // 라인 클리어 및 점수 처리
  function clearLines(newBoard) {
    let linesCleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r].every((cell) => cell !== null)) {
        newBoard.splice(r, 1);
        newBoard.unshift(Array(COLS).fill(null));
        linesCleared++;
        r++; // 다시 검사
      }
    }
    if (linesCleared > 0) {
      setScore((prev) => prev + linesCleared * 100);
      setBoard(newBoard);
    }
  }

  // 블록 이동 시도
  function move(dx, dy) {
    const { shape, x, y } = current;
    if (isValidPosition(shape, x + dx, y + dy)) {
      setCurrent({ ...current, x: x + dx, y: y + dy });
      return true;
    }
    return false;
  }

  // 블록 회전
  function rotate() {
    const { type, rotation } = current;
    const rotations = SHAPES[type];
    const nextRotation = (rotation + 1) % rotations.length;
    const nextShape = rotations[nextRotation];
    if (isValidPosition(nextShape, current.x, current.y)) {
      setCurrent({ ...current, rotation: nextRotation, shape: nextShape });
    }
  }

  // 게임 루프 - 블록 아래로 한 칸씩 내리기
  useEffect(() => {
    if (gameOver) return;

    gameRef.current = setInterval(() => {
      if (!move(0, 1)) {
        fixToBoard();
        const newBlock = randomShape();
        if (!isValidPosition(newBlock.shape, 3, 0)) {
          setGameOver(true);
          clearInterval(gameRef.current);
          return;
        }
        setCurrent({ ...newBlock, x: 3, y: 0 });
      }
    }, 700);

    return () => clearInterval(gameRef.current);
  }, [board, current, gameOver]);

  // 키보드 입력 처리
  useEffect(() => {
    function handleKey(e) {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          move(-1, 0);
          break;
        case "ArrowRight":
          move(1, 0);
          break;
        case "ArrowDown":
          move(0, 1);
          break;
        case "ArrowUp":
          rotate();
          break;
        case " ":
          // 스페이스바: 즉시 떨어뜨리기
          let dropY = current.y;
          while (isValidPosition(current.shape, current.x, dropY + 1)) {
            dropY++;
          }
          setCurrent({ ...current, y: dropY });
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, gameOver]);

  // 렌더링 보드에 현재 블록 합성
  function renderBoard() {
    const displayBoard = board.map((row) => row.slice());
    const { shape, x, y, type } = current;
    shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          const boardY = y + r;
          const boardX = x + c;
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            displayBoard[boardY][boardX] = type;
          }
        }
      });
    });
    return displayBoard;
  }

  const displayBoard = renderBoard();

  return (
    <div className="tetris-container">
      <div className="score">Score: {score}</div>
      <div
        className="board"
        style={{ width: COLS * BLOCK_SIZE, height: ROWS * BLOCK_SIZE }}
      >
        {displayBoard.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="block"
              style={{
                backgroundColor: cell ? COLORS[cell] : "transparent",
                border: cell ? "1px solid #333" : "1px solid #ddd",
                width: BLOCK_SIZE,
                height: BLOCK_SIZE,
              }}
            />
          ))
        )}
      </div>
      {gameOver && <div className="gameover">Game Over</div>}
    </div>
  );
}

export default Tetris;
