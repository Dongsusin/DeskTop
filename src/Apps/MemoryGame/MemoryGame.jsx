import React, { useEffect, useState } from "react";
import "./MemoryGame.css";

const cardSymbols = ["🐶", "🐱", "🐹", "🦊", "🐻", "🐼"];

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

  useEffect(() => {
    resetGame();
  }, []);

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
  };

  const resetGame = () => {
    setCards(shuffleArray(cardSymbols));
    setSelected([]);
    setIsChecking(false);
  };

  const matchedCount = cards.filter((card) => card.matched).length;
  const status =
    matchedCount === cardSymbols.length * 2
      ? "완료!"
      : `맞춘 쌍: ${matchedCount / 2}`;

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
    </div>
  );
}
