import React, { useState, useEffect, useRef } from "react";
import "./TicTacToe.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const winner = calculateWinner(board);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    clickSoundRef.current = new Audio("/sound/클릭.mp3");
  }, []);

  useEffect(() => {
    if (!isX && !winner) {
      const timeout = setTimeout(() => {
        aiMove();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isX, board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !isX) return;

    clickSoundRef.current?.play();

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsX(false);
  };

  const aiMove = () => {
    const emptyIndices = board
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    clickSoundRef.current?.play();

    const newBoard = [...board];
    newBoard[randomIndex] = "O";
    setBoard(newBoard);
    setIsX(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
  };

  const status = winner
    ? `승자: ${winner}`
    : board.every(Boolean)
    ? "무승부!"
    : isX
    ? "당신 차례 (X)"
    : "AI 차례 (O)";

  return (
    <div className="TicTacToe">
      <h1>틱택토</h1>
      <div className="status">{status}</div>
      <div className="TicTacToe-board">
        {board.map((value, i) => (
          <div
            key={i}
            className={`TicTacToe-cell ${value}`}
            onClick={() => handleClick(i)}
          >
            {value}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        다시 시작
      </button>
    </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}
