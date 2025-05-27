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

const monsterTypes = [
  { name: "슬라임", hp: (stage) => 25 + stage * 5, behavior: "heal" },
  { name: "고블린", hp: (stage) => 30 + stage * 10, behavior: "attack" },
  { name: "오크", hp: (stage) => 50 + stage * 15, behavior: "block" },
  { name: "마법사", hp: (stage) => 35 + stage * 8, behavior: "mixed" },
];

const bossTypes = [
  {
    name: "드래곤",
    hp: (stage) => 150 + stage * 20,
    behavior: "bossAttack",
  },
  {
    name: "리치 마법사",
    hp: (stage) => 120 + stage * 25,
    behavior: "bossMixed",
  },
];

const createEnemies = (stage) => {
  const isBossStage = stage % 5 === 0;

  if (isBossStage) {
    const boss = bossTypes[Math.floor(Math.random() * bossTypes.length)];
    return [
      {
        id: 0,
        name: `보스 ${boss.name}`,
        type: boss.name,
        behavior: boss.behavior,
        hp: boss.hp(stage),
        maxHp: boss.hp(stage),
        block: 0,
        poison: 0,
        stun: 0,
        isBoss: true,
        resist: Math.min(0.5, 0.1 + stage * 0.05),
      },
    ];
  }

  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }, (_, i) => {
    const type = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    return {
      id: i,
      name: `${type.name} ${i + 1}`,
      type: type.name,
      behavior: type.behavior,
      hp: type.hp(stage),
      maxHp: type.hp(stage),
      block: 0,
      poison: 0,
      stun: 0,
      isBoss: false,
      resist: Math.min(0.5, 0.1 + stage * 0.05),
    };
  });
};

const resetGame = () => {
  const stage = 1;
  const maxGauge = 5;
  setPlayer({ ...initialPlayer, gauge: maxGauge, maxGauge });
  setStage(stage);
  setEnemies(createEnemies(stage));
  setDeck([...baseCards]);
  setHand(drawCards(5));
  setMessages(["게임이 재시작되었습니다!"]);
  setSelectedCard(null);
  setIsGameOver(false);
};

const baseCards = [
  {
    id: 1,
    name: "공격",
    type: "attack",
    cost: 2,
    value: 10,
    baseValue: 10,
    level: 1,
    description: "적 1명에게 10 데미지",
  },
  {
    id: 2,
    name: "강타",
    type: "attack",
    cost: 3,
    value: 20,
    baseValue: 20,
    level: 1,
    description: "적 1명에게 20 데미지",
  },
  {
    id: 3,
    name: "방어",
    type: "defend",
    cost: 2,
    value: 10,
    baseValue: 10,
    level: 1,
    description: "10 방어력",
  },
  {
    id: 4,
    name: "힐",
    type: "heal",
    cost: 3,
    value: 5,
    baseValue: 5,
    level: 1,
    description: "15 체력 회복",
  },
  {
    id: 5,
    name: "강화",
    type: "buff",
    cost: 2,
    value: 5,
    baseValue: 5,
    level: 1,
    description: "다음 공격 데미지 +5",
  },
  {
    id: 6,
    name: "전체 공격",
    type: "aoe",
    cost: 4,
    value: 10,
    baseValue: 10,
    level: 1,
    description: "모든 적에게 10 데미지",
  },
  {
    id: 7,
    name: "중독 공격",
    type: "poison",
    cost: 2,
    value: 5,
    baseValue: 5,
    level: 1,
    description: "적 1명에게 5 중독",
  },
  {
    id: 8,
    name: "기절 공격",
    type: "stun",
    cost: 3,
    value: 1,
    baseValue: 1,
    level: 1,
    description: "적 1명 1턴 기절",
  },
  {
    id: 9,
    name: "전체 중독",
    type: "aoePoison",
    cost: 4,
    value: 3,
    baseValue: 3,
    level: 1,
    description: "모든 적에게 3 중독",
  },
  {
    id: 10,
    name: "전체 기절",
    type: "aoeStun",
    cost: 5,
    value: 1,
    baseValue: 1,
    level: 1,
    description: "모든 적 1턴 기절",
  },
];

function TurnBasedCardRPG() {
  const [player, setPlayer] = useState({ ...initialPlayer });
  const [enemies, setEnemies] = useState(createEnemies(1));
  const [deck, setDeck] = useState([...baseCards]);
  const [hand, setHand] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [stage, setStage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showUpgradeChoice, setShowUpgradeChoice] = useState(false);

  const drawCards = (num) => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };

  const addMessage = (msg) => {
    setMessages((prev) => {
      const newMessages = [...prev, msg];
      if (newMessages.length > 5) newMessages.shift();
      return newMessages;
    });
  };

  useEffect(() => {
    setHand(drawCards(5));
  }, []);

  useEffect(() => {
    if (selectedCard) addMessage("⚔ 적을 클릭하세요!");
  }, [selectedCard]);

  const handleCardClick = (card) => {
    if (player.gauge < card.cost) {
      addMessage("게이지가 부족합니다!");
      return;
    }

    const newGauge = player.gauge - card.cost;

    if (["attack", "poison", "stun"].includes(card.type)) {
      setSelectedCard(card);
      addMessage(`${card.name} 카드를 선택했습니다! 적을 클릭하세요.`);
      return;
    } else if (card.type === "aoe") {
      const newEnemies = enemies.map((e) => {
        const dmg = card.value + player.buff;
        const blocked = Math.min(dmg, e.block);
        const actualDmg = dmg - blocked;
        e.block = Math.max(0, e.block - dmg);
        e.hp = Math.max(0, e.hp - actualDmg);
        return e;
      });
      setEnemies(newEnemies);
      setPlayer({ ...player, gauge: newGauge, buff: 0 });
      addMessage(
        `전체 공격! 모든 적에게 ${
          card.value + player.buff
        } 데미지 (방어 적용됨)`
      );
      setHand(hand.filter((c) => c !== card));
    } else if (card.type === "aoePoison") {
      const newEnemies = enemies.map((e) => {
        if (Math.random() >= e.resist) {
          e.poison += card.value;
          addMessage(`${e.name} 중독됨!`);
        } else {
          addMessage(`${e.name} 중독 저항!`);
        }
        return e;
      });
      setEnemies(newEnemies);
      setPlayer({ ...player, gauge: newGauge });
      addMessage(`전체 중독! 모든 적에게 ${card.value} 중독`);
      setHand(hand.filter((c) => c !== card));
    } else if (card.type === "aoeStun") {
      const newEnemies = enemies.map((e) => {
        if (Math.random() >= e.resist) {
          e.stun = 1;
          addMessage(`${e.name} 기절!`);
        } else {
          addMessage(`${e.name} 기절 저항!`);
        }
        return e;
      });
      setEnemies(newEnemies);
      setPlayer({ ...player, gauge: newGauge });
      addMessage(`전체 기절! 모든 적 1턴 동안 행동 불가`);
      setHand(hand.filter((c) => c !== card));
    } else if (card.type === "defend") {
      setPlayer({
        ...player,
        block: player.block + card.value,
        gauge: newGauge,
      });
      addMessage(`방어 사용! ${card.value} 방어력`);
      setHand(hand.filter((c) => c !== card));
    } else if (card.type === "heal") {
      const healed = Math.min(player.maxHp, player.hp + card.value);
      setPlayer({ ...player, hp: healed, gauge: newGauge });
      addMessage(`힐 사용! ${card.value} 회복`);
      setHand(hand.filter((c) => c !== card));
    } else if (card.type === "buff") {
      setPlayer({ ...player, buff: player.buff + card.value, gauge: newGauge });
      addMessage(`강화 사용! 다음 공격 +${card.value}`);
      setHand(hand.filter((c) => c !== card));
    }
  };

  const handleEnemyClick = (index) => {
    if (!selectedCard) return;
    if (player.gauge < selectedCard.cost) {
      addMessage("게이지가 부족합니다!");
      return;
    }

    const card = selectedCard;
    const newGauge = player.gauge - card.cost;
    const newEnemies = [...enemies];
    const enemy = newEnemies[index];

    if (card.type === "attack") {
      const dmg = card.value + player.buff;
      const blocked = Math.min(dmg, enemy.block);
      const actualDmg = dmg - blocked;
      enemy.block = Math.max(0, enemy.block - dmg);
      enemy.hp = Math.max(0, enemy.hp - actualDmg);
      setPlayer({ ...player, gauge: newGauge, buff: 0 });
      addMessage(
        `${card.name} 사용! ${enemy.name}에게 ${actualDmg} 데미지 (방어 ${blocked})`
      );
    } else if (card.type === "poison") {
      enemy.poison += card.value;
      setPlayer({ ...player, gauge: newGauge });
      addMessage(`중독! ${enemy.name}에게 ${card.value} 중독`);
    } else if (card.type === "stun") {
      enemy.stun = 1;
      setPlayer({ ...player, gauge: newGauge });
      addMessage(`${enemy.name}을(를) 기절시켰습니다!`);
    }

    setEnemies(newEnemies);
    setSelectedCard(null);
    setHand(hand.filter((c) => c !== card));
  };

  const endTurn = () => {
    const newPlayer = { ...player };
    const newEnemies = enemies.map((enemy) => {
      if (enemy.hp <= 0) return enemy;

      if (enemy.poison > 0) {
        enemy.hp = Math.max(0, enemy.hp - enemy.poison);
        addMessage(`${enemy.name} 중독으로 ${enemy.poison} 피해`);

        if (enemy.hp === 0) {
          addMessage(`${enemy.name}은(는) 중독으로 쓰러졌습니다!`);
          return enemy;
        }
      }

      if (enemy.stun > 0) {
        enemy.stun -= 1;
        addMessage(`${enemy.name}은(는) 기절 상태!`);
        return enemy;
      }

      const roll = Math.random();
      const behavior = enemy.behavior;

      if (
        (behavior === "attack" && roll < 0.7) ||
        (behavior === "mixed" && roll < 0.5)
      ) {
        const dmg = 6 + Math.floor(Math.random() * 5);
        const actual = Math.max(0, dmg - newPlayer.block);
        newPlayer.block = Math.max(0, newPlayer.block - dmg);
        newPlayer.hp = Math.max(0, newPlayer.hp - actual);
        addMessage(`${enemy.name}의 공격! ${actual} 피해`);
      } else if (
        (behavior === "block" && roll < 0.7) ||
        (behavior === "mixed" && roll < 0.75)
      ) {
        enemy.block += 6;
        addMessage(`${enemy.name} 방어 강화! +6`);
      } else {
        const heal = 5 + Math.floor(Math.random() * 3);
        enemy.hp = Math.min(enemy.maxHp, enemy.hp + heal);
        addMessage(`${enemy.name} 회복! +${heal}`);
      }
      if (enemy.behavior === "bossAttack") {
        const dmg = 12 + Math.floor(Math.random() * 8);
        const actual = Math.max(0, dmg - newPlayer.block);
        newPlayer.block = Math.max(0, newPlayer.block - dmg);
        newPlayer.hp = Math.max(0, newPlayer.hp - actual);
        addMessage(`${enemy.name}의 강력한 브레스! ${actual} 피해`);
      } else if (enemy.behavior === "bossMixed") {
        const roll = Math.random();
        if (roll < 0.4) {
          const dmg = 10 + Math.floor(Math.random() * 6);
          const actual = Math.max(0, dmg - newPlayer.block);
          newPlayer.block = Math.max(0, newPlayer.block - dmg);
          newPlayer.hp = Math.max(0, newPlayer.hp - actual);
          addMessage(`${enemy.name}의 암흑 마법! ${actual} 피해`);
        } else if (roll < 0.7) {
          enemy.block += 10;
          addMessage(`${enemy.name} 마법 방어! +10`);
        } else {
          const heal = 15;
          enemy.hp = Math.min(enemy.maxHp, enemy.hp + heal);
          addMessage(`${enemy.name} 어둠의 회복! +${heal}`);
        }
      }

      return enemy;
    });

    if (newPlayer.hp <= 0) {
      setIsGameOver(true);
      addMessage("💀 게임 오버! 당신은 쓰러졌습니다.");
      return;
    }

    setPlayer({ ...newPlayer, gauge: player.maxGauge });
    setEnemies(newEnemies);
    setHand(drawCards(5));
    addMessage("턴 종료!");
  };

  const nextStage = () => {
    const newStage = stage + 1;
    setStage(newStage);

    if (newStage % 3 === 0) {
      setShowUpgradeChoice(true);
    } else {
      proceedToStage(newStage, player.maxGauge);
    }
  };

  const proceedToStage = (stage, newMaxGauge) => {
    setPlayer({ ...initialPlayer, maxGauge: newMaxGauge, gauge: newMaxGauge });
    setEnemies(createEnemies(stage));
    setHand(drawCards(5));
    addMessage(`스테이지 ${stage} 시작!`);
    setShowUpgradeChoice(false);
  };

  const handleUpgradeChoice = (choice) => {
    if (choice === "gauge") {
      proceedToStage(stage, player.maxGauge + 1);
      addMessage("⚡ 최대 게이지가 증가했습니다!");
    } else if (choice === "card") {
      upgradeRandomCard();
      proceedToStage(stage, player.maxGauge);
    }
  };

  const upgradeRandomCard = () => {
    const upgradable = deck.filter((card) => card.level < 5);
    if (upgradable.length === 0) {
      addMessage("더 이상 강화할 카드가 없습니다!");
      return;
    }

    const idx = Math.floor(Math.random() * upgradable.length);
    const cardToUpgrade = upgradable[idx];
    cardToUpgrade.level += 1;
    cardToUpgrade.value = cardToUpgrade.baseValue * cardToUpgrade.level;
    cardToUpgrade.description = `${cardToUpgrade.name} (Lv.${cardToUpgrade.level}): ${cardToUpgrade.value} 효과`;

    setDeck([...deck]);
    addMessage(
      `${cardToUpgrade.name} 카드가 Lv.${cardToUpgrade.level}로 강화되었습니다!`
    );
  };

  return (
    <div className="TurnBasedCardRPG">
      <div className="container">
        {isGameOver ? (
          <div className="game-over-screen">
            <h2>💀 게임 오버</h2>
            <p>스테이지 {stage}까지 도달했습니다.</p>
            <button onClick={resetGame}>게임 재시작</button>
          </div>
        ) : (
          <>
            <h2>스테이지 {stage}</h2>
            <div className="player">
              ❤️ {player.hp}/{player.maxHp} | 🛡 {player.block} | ⚡{" "}
              {player.gauge}/{player.maxGauge} | 💪 버프 {player.buff}
            </div>

            <div className="enemies">
              {enemies.map((enemy, i) => (
                <div
                  key={enemy.id}
                  className={`enemy ${enemy.hp <= 0 ? "dead" : ""} ${
                    enemy.isBoss ? "boss" : ""
                  }`}
                  onClick={() => handleEnemyClick(i)}
                >
                  <div>{enemy.name}</div>
                  <div>
                    HP: {enemy.hp} / {enemy.maxHp}
                  </div>
                  <div>🛡 저항: {Math.round(enemy.resist * 100)}%</div>
                  {enemy.block > 0 && <div>🛡 방어: {enemy.block}</div>}
                  {enemy.poison > 0 && <div>☠ 중독: {enemy.poison}</div>}
                  {enemy.stun > 0 && <div>💫 기절</div>}
                </div>
              ))}
            </div>

            <div className="hand">
              {hand.map((card) => (
                <div
                  key={card.id + Math.random()}
                  className={`card ${
                    selectedCard?.id === card.id ? "selected" : ""
                  } ${player.gauge < card.cost ? "disabled" : ""}`}
                  onClick={() => {
                    if (player.gauge >= card.cost) handleCardClick(card);
                  }}
                >
                  <div className="card-title">
                    {card.name} ({card.cost})
                  </div>
                  <div className="card-desc">
                    {card.description}
                    {card.type === "attack" &&
                      player.buff > 0 &&
                      ` (실제 ${card.value + player.buff})`}
                  </div>
                </div>
              ))}
            </div>

            {selectedCard?.type.includes("attack") && (
              <div className="select-target-hint">⚔ 적을 클릭하세요!</div>
            )}

            {showUpgradeChoice && (
              <div className="choice-popup">
                <h3>보상 선택</h3>
                <button onClick={() => handleUpgradeChoice("gauge")}>
                  ⚡ 최대 게이지 +1
                </button>
                <button onClick={() => handleUpgradeChoice("card")}>
                  🃏 무작위 카드 강화
                </button>
              </div>
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
          </>
        )}
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className="message">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TurnBasedCardRPG;
