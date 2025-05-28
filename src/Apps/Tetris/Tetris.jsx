// Tetris.jsx (전체 기능 포함)
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

  // 사운드 객체 참조 저장
  const moveSound = useRef(null);
  const gameoverSound = useRef(null);
  const levelSound = useRef(null);
  const deleteSound = useRef(null);
  const BGMSound = useRef(null);
  useEffect(() => {
    // 오디오 객체 초기화
    moveSound.current = new Audio("/sound/게임/이동.mp3");
    gameoverSound.current = new Audio("/sound/게임/게임오버.mp3");
    levelSound.current = new Audio("/sound/게임/레벨업.mp3");
    deleteSound.current = new Audio("/sound/게임/줄삭제.mp3");
    BGMSound.current = new Audio("/sound/게임/테트리스.mp4");

    BGMSound.current.loop = true;
    BGMSound.current.volume = 0.2; // 배경음 크기 조절
  }, []);

  function getDropInterval(level) {
    return Math.max(100, 500 - (level - 1) * 50);
  }

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
  const prevLevelRef = useRef(1); // 초기값은 기본 레벨

  function clearLines(newBoard) {
    const rowsToClear = [];
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r].every((cell) => cell !== null)) {
        rowsToClear.push(r);
      }
    }
    if (rowsToClear.length > 0) {
      setBlinkingRows(rowsToClear);
      setTimeout(() => {
        const updatedBoard = [...newBoard];
        rowsToClear.forEach((r) => {
          updatedBoard.splice(r, 1);
          updatedBoard.unshift(Array(COLS).fill(null));
        });
        deleteSound.current?.play(); // 줄 삭제 사운드

        const newScore = score + rowsToClear.length * 100;
        const newLevel = Math.floor(newScore / 500) + 1;

        // 이전 레벨과 새 레벨 비교
        if (newLevel > prevLevelRef.current) {
          levelSound.current?.play(); // 레벨업 사운드
        }

        prevLevelRef.current = newLevel; // 이전 레벨 갱신

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
    moveSound.current?.play(); // 사운드
  }

  function handleHardDrop() {
    if (gameOver) return;
    const { shape, x, y, type } = current;
    let dropY = y;
    while (isValidPosition(shape, x, dropY + 1)) {
      dropY++;
    }
    const newBoard = board.map((row) => row.slice());
    shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          const boardY = dropY + r;
          const boardX = x + c;
          if (boardY >= 0) newBoard[boardY][boardX] = type;
        }
      });
    });
    setBoard(newBoard);
    clearLines(newBoard);
    const newBlock = randomShape();
    if (!isValidPosition(newBlock.shape, 3, 0)) {
      gameoverSound.current?.play(); // 사운드
      setGameOver(true);
      if (score > highScore) {
        localStorage.setItem("tetrisHighScore", score.toString());
        setHighScore(score);
      }
    } else {
      setCurrent({ ...newBlock, x: 3, y: 0 });
    }
    moveSound.current?.play(); // 사운드
  }

  useEffect(() => {
    if (gameOver || !started) return;
    const interval = setInterval(() => {
      if (!move(0, 1)) {
        handleHardDrop();
      }
    }, getDropInterval(level));
    return () => clearInterval(interval);
  }, [board, current, gameOver, level, started]);

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
          handleHardDrop();
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, gameOver]);

  function getGhostY(shape, x, y) {
    let ghostY = y;
    while (isValidPosition(shape, x, ghostY + 1)) ghostY++;
    return ghostY;
  }

  function renderBoard() {
    const displayBoard = board.map((row) => row.slice());
    const { shape, x, y, type } = current;
    const ghostY = getGhostY(shape, x, y);
    shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          const boardY = ghostY + r;
          const boardX = x + c;
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            displayBoard[boardY][boardX] = `ghost-${type}`;
          }
        }
      });
    });
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

  if (!started) {
    return (
      <div className="tetris-intro">
        <h1>테트리스</h1>
        <p>최고점수: {highScore}</p>
        <button onClick={() => setStarted(true)}>게임시작</button>
      </div>
    );
  }

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
