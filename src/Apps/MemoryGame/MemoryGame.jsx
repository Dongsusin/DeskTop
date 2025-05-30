import React, { useEffect, useState, useRef } from "react";
import "./MemoryGame.css";

const allCardSymbols = [
  "🐶",
  "🐱",
  "🐹",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐸",
  "🐵",
  "🐰",
];

function shuffleArray(array) {
  return array
    .concat(array)
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false,
    }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  const [showIntro, setShowIntro] = useState(true);
  const [gameSize, setGameSize] = useState(6);

  const clickSoundRef = useRef(null);

  useEffect(() => {
    clickSoundRef.current = new Audio("/sound/클릭.mp3");
  }, []);

  useEffect(() => {
    if (!showIntro) {
      resetGame();
    }
  }, [showIntro]);

  useEffect(() => {
    if (selected.length === 2) {
      setIsChecking(true);
      setTimeout(() => {
        const [first, second] = selected;
        const newCards = [...cards];

        if (first.symbol === second.symbol) {
          newCards[first.id].matched = true;
          newCards[second.id].matched = true;
        } else {
          newCards[first.id].flipped = false;
          newCards[second.id].flipped = false;
        }

        setCards(newCards);
        setSelected([]);
        setIsChecking(false);
      }, 800);
    }
  }, [selected]);

  const handleClick = (index) => {
    if (isChecking || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setSelected((prev) => [...prev, newCards[index]]);
    clickSoundRef.current?.play();
  };

  const resetGame = () => {
    const selectedSymbols = allCardSymbols.slice(0, gameSize);
    setCards(shuffleArray(selectedSymbols));
    setSelected([]);
    setIsChecking(false);
  };

  const matchedCount = cards.filter((card) => card.matched).length;
  const status =
    matchedCount === gameSize * 2 ? "완료!" : `맞춘 쌍: ${matchedCount / 2}`;

  if (showIntro) {
    return (
      <div className="MemoryGame Intro">
        <h1>카드 뒤집기 게임</h1>
        <div className="game-select">
          <label htmlFor="gameSize">게임판 크기</label>
          <select
            id="gameSize"
            value={gameSize}
            onChange={(e) =>
              setGameSize(Math.min(12, Math.max(1, Number(e.target.value))))
            }
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} 쌍 ({(i + 1) * 2}장)
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => setShowIntro(false)}>게임 시작</button>
      </div>
    );
  }

  return (
    <div className="MemoryGame">
      <h1>카드 뒤집기</h1>
      <div className="status">{status}</div>
      <div className="card-grid">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
            onClick={() => handleClick(i)}
          >
            <div className="card-front">{card.symbol}</div>
            <div className="card-back">❓</div>
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        다시 시작
      </button>
      <button
        className="reset"
        onClick={() => setShowIntro(true)}
        style={{ marginLeft: 8 }}
      >
        메인으로
      </button>
    </div>
  );
}
