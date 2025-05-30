import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const types = Object.keys(SHAPES);
  const type = types[Math.floor(Math.random() * types.length)];
  return { type, rotation: 0, shape: SHAPES[type][0] };
}

function Tetris() {
  const emptyBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const [board, setBoard] = useState(emptyBoard);
  const [current, setCurrent] = useState({ ...randomShape(), x: 3, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("tetrisHighScore") || "0", 10)
  );
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [comboText, setComboText] = useState("");
  const [blinkingRows, setBlinkingRows] = useState([]);
  const prevLevelRef = useRef(1);
  const gameoverSound = useRef();
  const levelSound = useRef();
  const deleteSound = useRef();
  const BGMSound = useRef();

  useEffect(() => {
    gameoverSound.current = new Audio("/sound/게임/게임오버.mp3");
    levelSound.current = new Audio("/sound/게임/레벨업.mp3");
    deleteSound.current = new Audio("/sound/게임/줄삭제.mp3");
  }, []);

  const isValidPosition = useCallback(
    (shape, x, y) => {
      return shape.every((row, r) =>
        row.every((cell, c) => {
          if (!cell) return true;
          const nx = x + c,
            ny = y + r;
          return (
            nx >= 0 && nx < COLS && ny < ROWS && (!board[ny] || !board[ny][nx])
          );
        })
      );
    },
    [board]
  );

  const move = useCallback(
    (dx, dy) => {
      const { shape, x, y } = current;
      if (isValidPosition(shape, x + dx, y + dy)) {
        setCurrent((prev) => ({ ...prev, x: x + dx, y: y + dy }));
        return true;
      }
      return false;
    },
    [current, isValidPosition]
  );

  const rotate = useCallback(() => {
    const { type, rotation } = current;
    const rotations = SHAPES[type];
    const nextRotation = (rotation + 1) % rotations.length;
    const nextShape = rotations[nextRotation];
    if (isValidPosition(nextShape, current.x, current.y)) {
      setCurrent((prev) => ({
        ...prev,
        rotation: nextRotation,
        shape: nextShape,
      }));
    }
  }, [current, isValidPosition]);

  const clearLines = useCallback(
    (newBoard) => {
      const rowsToClear = newBoard
        .map((row, idx) => (row.every((cell) => cell !== null) ? idx : -1))
        .filter((i) => i >= 0);
      if (rowsToClear.length > 0) {
        setBlinkingRows(rowsToClear);
        setTimeout(() => {
          const updatedBoard = [...newBoard];
          rowsToClear.forEach((r) => {
            updatedBoard.splice(r, 1);
            updatedBoard.unshift(Array(COLS).fill(null));
          });
          deleteSound.current?.play();
          const newScore = score + rowsToClear.length * 100;
          const newLevel = Math.floor(newScore / 500) + 1;
          if (newLevel > prevLevelRef.current) levelSound.current?.play();
          prevLevelRef.current = newLevel;
          setScore(newScore);
          setLevel(newLevel);
          setBoard(updatedBoard);
          setBlinkingRows([]);
          setComboText(
            `+${rowsToClear.length * 100}${
              rowsToClear.length >= 2 ? " Combo!" : ""
            }`
          );
          setTimeout(() => setComboText(""), 800);
        }, 250);
      }
    },
    [score]
  );

  const handleHardDrop = useCallback(() => {
    if (gameOver) return;
    const { shape, x, y, type } = current;
    let dropY = y;
    while (isValidPosition(shape, x, dropY + 1)) dropY++;
    const newBoard = board.map((row) => row.slice());
    shape.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell) {
          const ny = dropY + r,
            nx = x + c;
          if (ny >= 0) newBoard[ny][nx] = type;
        }
      })
    );
    setBoard(newBoard);
    clearLines(newBoard);
    const next = randomShape();
    if (!isValidPosition(next.shape, 3, 0)) {
      gameoverSound.current?.play();
      setGameOver(true);
      if (score > highScore) {
        localStorage.setItem("tetrisHighScore", score.toString());
        setHighScore(score);
      }
    } else {
      setCurrent({ ...next, x: 3, y: 0 });
    }
  }, [board, current, gameOver, highScore, score, isValidPosition, clearLines]);

  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(() => {
      if (!move(0, 1)) handleHardDrop();
    }, Math.max(100, 500 - (level - 1) * 50));
    return () => clearInterval(interval);
  }, [started, gameOver, level, move, handleHardDrop]);

  useEffect(() => {
    const handleKey = (e) => {
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
          handleHardDrop();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move, rotate, handleHardDrop, gameOver]);

  const renderBoard = () => {
    const ghostY = (() => {
      let gy = current.y;
      while (isValidPosition(current.shape, current.x, gy + 1)) gy++;
      return gy;
    })();

    const ghostBoard = board.map((row) => [...row]);
    current.shape.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell) {
          const gy = ghostY + r,
            gx = current.x + c;
          if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS) {
            ghostBoard[gy][gx] = `ghost-${current.type}`;
          }
        }
      })
    );

    current.shape.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell) {
          const y = current.y + r,
            x = current.x + c;
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
            ghostBoard[y][x] = current.type;
          }
        }
      })
    );

    return ghostBoard;
  };

  if (!started) {
    return (
      <div className="tetris-intro">
        <h1>테트리스</h1>
        <p>최고점수: {highScore}</p>
        <button onClick={() => setStarted(true)}>게임시작</button>
      </div>
    );
  }

  const displayBoard = renderBoard();

  return (
    <div className="tetris-container">
      <div className="header">
        <div className="score">점수: {score}</div>
        <div className="level">레벨: {level}</div>
        <div className="score">최고점수: {highScore}</div>
      </div>
      {comboText && <div className="combo-text">{comboText}</div>}
      <div
        className="board"
        style={{ width: COLS * BLOCK_SIZE, height: ROWS * BLOCK_SIZE }}
      >
        {displayBoard.map((row, r) =>
          row.map((cell, c) => {
            const isGhost =
              typeof cell === "string" && cell.startsWith("ghost-");
            const color = isGhost
              ? COLORS[cell.replace("ghost-", "")]
              : COLORS[cell];
            return (
              <div
                key={`${r}-${c}`}
                className={`block ${blinkingRows.includes(r) ? "laser" : ""}`}
                style={{
                  backgroundColor: isGhost
                    ? "transparent"
                    : color || "transparent",
                  border: isGhost
                    ? `1px dashed ${color}`
                    : cell
                    ? "1px solid #333"
                    : "1px solid #ddd",
                  opacity: isGhost ? 0.3 : 1,
                  width: BLOCK_SIZE,
                  height: BLOCK_SIZE,
                  animationDelay: blinkingRows.includes(r)
                    ? `${Math.abs(c - COLS / 2) * 30}ms`
                    : "0ms",
                }}
              />
            );
          })
        )}
      </div>
      {gameOver && <div className="gameover">Game Over</div>}
      <div className="controls">
        <button onClick={() => move(-1, 0)}>←</button>
        <button onClick={() => move(1, 0)}>→</button>
        <button onClick={() => move(0, 1)}>↓</button>
        <button onClick={rotate}>⟳</button>
        <button onClick={handleHardDrop}>⇩</button>
      </div>
    </div>
  );
}

export default Tetris;
