import React, { useState, useEffect, useRef } from "react";
import "./Tetris.css";

const ROWS = 15;
const COLS = 10;
const BLOCK_SIZE = 30;

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

  function clearLines(newBoard) {
    let linesCleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r].every((cell) => cell !== null)) {
        newBoard.splice(r, 1);
        newBoard.unshift(Array(COLS).fill(null));
        linesCleared++;
        r++;
      }
    }
    if (linesCleared > 0) {
      setScore((prev) => prev + linesCleared * 100);
      setBoard(newBoard);
    }
  }

  function move(dx, dy) {
    const { shape, x, y } = current;
    if (isValidPosition(shape, x + dx, y + dy)) {
      setCurrent({ ...current, x: x + dx, y: y + dy });
      return true;
    }
    return false;
  }

  function rotate() {
    const { type, rotation } = current;
    const rotations = SHAPES[type];
    const nextRotation = (rotation + 1) % rotations.length;
    const nextShape = rotations[nextRotation];
    if (isValidPosition(nextShape, current.x, current.y)) {
      setCurrent({ ...current, rotation: nextRotation, shape: nextShape });
    }
  }

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
    }, 300);

    return () => clearInterval(gameRef.current);
  }, [board, current, gameOver]);

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

  function handleMoveLeft() {
    if (!gameOver) move(-1, 0);
  }
  function handleMoveRight() {
    if (!gameOver) move(1, 0);
  }
  function handleMoveDown() {
    if (!gameOver) move(0, 1);
  }
  function handleRotate() {
    if (!gameOver) rotate();
  }
  function handleHardDrop() {
    if (gameOver) return;
    let dropY = current.y;
    while (isValidPosition(current.shape, current.x, dropY + 1)) {
      dropY++;
    }
    setCurrent({ ...current, y: dropY });
  }

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

      <div className="controls">
        <button onClick={handleMoveLeft} style={{ padding: "10px 15px" }}>
          ←
        </button>
        <button onClick={handleMoveRight} style={{ padding: "10px 15px" }}>
          →
        </button>
        <button onClick={handleMoveDown} style={{ padding: "10px 15px" }}>
          ↓
        </button>
        <button onClick={handleRotate} style={{ padding: "10px 15px" }}>
          ⟳
        </button>
        <button onClick={handleHardDrop} style={{ padding: "10px 15px" }}>
          ⇩
        </button>
      </div>
    </div>
  );
}

export default Tetris;
