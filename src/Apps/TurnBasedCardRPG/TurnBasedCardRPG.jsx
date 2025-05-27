import React, { useState, useEffect } from "react";
import "./TurnBasedCardRPG.css";

const initialPlayer = {
  hp: 100,
  maxHp: 100,
  block: 0,
  gauge: 5,
  maxGauge: 5,
  buff: 0,
};

const createEnemies = (stage) => {
  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `몬스터 ${i + 1}`,
    hp: 30 + stage * 10,
    maxHp: 30 + stage * 10,
    block: 0,
  }));
};

const cards = [
  {
    id: 1,
    name: "공격",
    type: "attack",
    cost: 2,
    value: 10,
    description: "적 1명에게 10 데미지를 줍니다.",
  },
  {
    id: 2,
    name: "강타",
    type: "attack",
    cost: 3,
    value: 20,
    description: "적 1명에게 강력한 20 데미지를 줍니다.",
  },
  {
    id: 3,
    name: "방어",
    type: "defend",
    cost: 2,
    value: 10,
    description: "자신에게 10 방어력을 부여합니다.",
  },
  {
    id: 4,
    name: "힐",
    type: "heal",
    cost: 3,
    value: 15,
    description: "자신의 체력을 15 회복합니다.",
  },
  {
    id: 5,
    name: "강화",
    type: "buff",
    cost: 2,
    value: 5,
    description: "다음 공격의 데미지를 5 증가시킵니다.",
  },
];

function TurnBasedCardRPG() {
  const [player, setPlayer] = useState({ ...initialPlayer });
  const [enemies, setEnemies] = useState(createEnemies(1));
  const [hand, setHand] = useState([...cards]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [stage, setStage] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedCard) {
      setMessage("⚔ 적을 클릭하세요!");
    } else {
      setMessage("");
    }
  }, [selectedCard]);

  const handleCardClick = (card) => {
    if (player.gauge < card.cost) {
      setMessage("게이지가 부족합니다!");
      return;
    }

    if (["attack"].includes(card.type)) {
      setSelectedCard(card);
    } else {
      const newGauge = player.gauge - card.cost;
      if (card.type === "defend") {
        setPlayer({
          ...player,
          block: player.block + card.value,
          gauge: newGauge,
        });
        setMessage(`방어 사용! ${card.value} 방어력`);
      } else if (card.type === "heal") {
        const healed = Math.min(player.maxHp, player.hp + card.value);
        setPlayer({ ...player, hp: healed, gauge: newGauge });
        setMessage(`힐 사용! ${card.value} 회복`);
      } else if (card.type === "buff") {
        setPlayer({
          ...player,
          gauge: newGauge,
          buff: player.buff + card.value,
        });
        setMessage(`강화 사용! 다음 공격 데미지 +${card.value}`);
      }
    }
  };

  const handleEnemyClick = (index) => {
    if (!selectedCard) return;

    const newGauge = player.gauge - selectedCard.cost;
    if (player.gauge < selectedCard.cost) {
      setMessage("게이지가 부족합니다!");
      return;
    }

    const newEnemies = [...enemies];

    if (selectedCard.type === "attack") {
      const damage = selectedCard.value + player.buff;
      newEnemies[index].hp -= damage;
      newEnemies[index].hp = Math.max(newEnemies[index].hp, 0);
      setMessage(`${selectedCard.name} 사용! ${damage} 데미지를 입혔습니다.`);
      setPlayer({ ...player, gauge: newGauge, buff: 0 });
    }

    setEnemies(newEnemies);
    setSelectedCard(null);
  };

  const endTurn = () => {
    // 몬스터 턴
    const newPlayer = { ...player };
    enemies.forEach((enemy) => {
      if (enemy.hp <= 0) return;

      const action = Math.random();
      if (action < 0.5) {
        // 공격
        let dmg = 5 + Math.floor(Math.random() * 5);
        const realDmg = Math.max(0, dmg - newPlayer.block);
        newPlayer.block = Math.max(0, newPlayer.block - dmg);
        newPlayer.hp = Math.max(0, newPlayer.hp - realDmg);
      } else if (action < 0.75) {
        // 방어
        enemy.block = (enemy.block || 0) + 5;
      } else {
        // 힐
        enemy.hp = Math.min(enemy.maxHp, enemy.hp + 5);
      }
    });

    setPlayer({
      ...newPlayer,
      gauge: newPlayer.maxGauge,
    });

    const newEnemies = enemies.map((enemy) => ({
      ...enemy,
      block: 0,
    }));

    setEnemies(newEnemies);
    setMessage("몬스터 턴 종료!");
  };

  const nextStage = () => {
    const newStage = stage + 1;
    const newMaxGauge = player.maxGauge + 1;
    setStage(newStage);
    setPlayer({ ...initialPlayer, maxGauge: newMaxGauge, gauge: newMaxGauge });
    setEnemies(createEnemies(newStage));
    setMessage(`스테이지 ${newStage} 시작!`);
  };

  return (
    <div className="TurnBasedCardRPG">
      <h2>스테이지 {stage}</h2>

      <div className="player">
        ❤️ {player.hp}/{player.maxHp} | 🛡 {player.block} | ⚡ {player.gauge}/
        {player.maxGauge} | 💪 버프 {player.buff}
      </div>

      <div className="enemies">
        {enemies.map((enemy, i) => (
          <div
            key={enemy.id}
            className={`enemy ${enemy.hp <= 0 ? "dead" : ""}`}
            onClick={() => handleEnemyClick(i)}
          >
            <div>{enemy.name}</div>
            <div>
              HP: {enemy.hp} / {enemy.maxHp}
            </div>
          </div>
        ))}
      </div>

      <div className="hand">
        {hand.map((card) => {
          let extra = "";
          if (card.type === "attack" && player.buff > 0) {
            extra = ` (실제 ${card.value + player.buff} 데미지)`;
          }
          return (
            <div
              key={card.id}
              className={`card ${
                selectedCard?.id === card.id ? "selected" : ""
              }`}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-title">
                {card.name} ({card.cost})
              </div>
              <div className="card-desc">
                {card.description}
                {extra}
              </div>
            </div>
          );
        })}
      </div>

      {selectedCard && selectedCard.type.includes("attack") && (
        <div className="select-target-hint">⚔ 적을 클릭하세요!</div>
      )}

      {enemies.every((e) => e.hp <= 0) ? (
        <button onClick={nextStage} className="end-turn">
          다음 스테이지
        </button>
      ) : (
        <button onClick={endTurn} className="end-turn">
          턴 종료
        </button>
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default TurnBasedCardRPG;
