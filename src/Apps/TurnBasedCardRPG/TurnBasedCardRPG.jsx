import React, { useState, useEffect, useRef } from "react";
import "./TurnBasedCardRPG.css";

const initialPlayer = {
  hp: 100,
  maxHp: 100,
  block: 0,
  gauge: 5,
  maxGauge: 5,
  buff: 0,
  equipment: {},
  atk: 0,
  startBlock: 0,
  gold: 0,
};

const equipmentTypes = ["투구", "갑옷", "무기", "신발", "장갑"];

const applyEquipmentEffects = (base, equipment) => {
  const modified = { ...base };
  for (const item of Object.values(equipment)) {
    if (!item?.effect) continue;
    for (const key in item.effect) {
      const mappedKey =
        {
          공격력: "atk",
          방어력: "startBlock",
          체력: "maxHp",
        }[key] || key;
      modified[mappedKey] = (modified[mappedKey] || 0) + item.effect[key];
    }
  }
  return modified;
};

const monsterTypes = [
  { name: "거미", hp: (stage) => 25 + stage * 5, behavior: "heal" },
  { name: "고블린", hp: (stage) => 30 + stage * 10, behavior: "attack" },
  { name: "멧돼지", hp: (stage) => 50 + stage * 15, behavior: "block" },
  { name: "마법사", hp: (stage) => 35 + stage * 8, behavior: "mixed" },
];

const getMonsterImageByType = (type) => {
  const map = {
    거미: "/image/game/거미.jpg",
    고블린: "/image/game/고블린.jpg",
    멧돼지: "/image/game/멧돼지.jpg",
    마법사: "/image/game/마법사.jpg",
    드래곤: "/image/game/드래곤.jpg",
    "리치 마법사": "/image/game/리치.jpg",
  };
  return map[type] || "/images/default.png";
};

const bossTypes = [
  {
    name: "드래곤",
    hp: (stage) => 150 + stage * 10,
    behavior: "bossAttack",
  },
  {
    name: "리치 마법사",
    hp: (stage) => 120 + stage * 15,
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
        block: stage > 1 ? Math.floor(stage / 2) : 0,
        poison: 0,
        stun: 0,
        isBoss: true,
        resist: Math.min(0.99, 0.1 + stage * 0.05),
        damage: 12 + stage * 1.5,
        image: getMonsterImageByType(boss.name),
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
      block: stage > 1 ? Math.floor(stage / 2) : 0,
      poison: 0,
      stun: 0,
      isBoss: false,
      resist: Math.min(0.3, 0.05 + stage * 0.05),
      damage: 6 + stage * 1,
      image: getMonsterImageByType(type.name),
    };
  });
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

  // 사운드 객체 참조 저장
  const clickSoundRef = useRef(null);
  const gameOverSound = useRef(null);
  const levelSound = useRef(null);
  const bulfSound = useRef(null);
  const attack1Sound = useRef(null);
  const attack2Sound = useRef(null);
  const deadSound = useRef(null);

  useEffect(() => {
    // 오디오 객체 초기화 (최초 1회만)
    clickSoundRef.current = new Audio("/sound/클릭.mp3");
    gameOverSound.current = new Audio("/sound/게임/게임오버.mp3");
    levelSound.current = new Audio("/sound/게임/레벨업.mp3");
    bulfSound.current = new Audio("/sound/게임/버프.mp3");
    attack1Sound.current = new Audio("/sound/게임/베기.mp3");
    attack2Sound.current = new Audio("/sound/게임/찌르기.mp3");
    deadSound.current = new Audio("/sound/게임/사망.mp3");
  }, []);

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
    clickSoundRef.current?.play(); // 클릭 사운드
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
        const dmg = card.value + player.buff + (player.atk || 0);
        const blocked = Math.min(dmg, e.block);
        const actualDmg = dmg - blocked;
        e.block = Math.max(0, e.block - dmg);
        e.hp = Math.max(0, e.hp - actualDmg);
        return e;
      });
      attack1Sound.current?.play(); // 클릭 사운드
      setEnemies(newEnemies);
      setPlayer({ ...player, gauge: newGauge, buff: 0 });
      addMessage(
        `전체 공격! 모든 적에게 ${
          card.value + player.buff
        } 데미지 (방어 적용됨)`
      );
      setHand(hand.filter((c) => c !== card));
      if (enemy.hp <= 0) {
        deadSound.current?.play(); // 클릭 사운드
        return enemy;
      }
    } else if (card.type === "aoePoison") {
      const newEnemies = enemies.map((e) => {
        if (Math.random() >= e.resist) {
          e.poison += card.value;
          addMessage(`${e.name} 중독됨!`);
        } else {
          addMessage(`${e.name} 중독 저항!`);
        }
        attack2Sound.current?.play(); // 클릭 사운드
        return e;
      });
      attack2Sound.current?.play(); // 클릭 사운드
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
        attack1Sound.current?.play(); // 클릭 사운드
        return e;
      });
      attack1Sound.current?.play(); // 클릭 사운드
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
      bulfSound.current?.play(); // 클릭 사운드
      addMessage(`방어 사용! ${card.value} 방어력`);
      setHand(hand.filter((c) => c !== card));
    } else if (card.type === "heal") {
      bulfSound.current?.play(); // 클릭 사운드
      const healed = Math.min(player.maxHp, player.hp + card.value);
      setPlayer({ ...player, hp: healed, gauge: newGauge });
      addMessage(`힐 사용! ${card.value} 회복`);
      setHand(hand.filter((c) => c !== card));
    } else if (card.type === "buff") {
      bulfSound.current?.play(); // 클릭 사운드
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
      const dmg = card.value + player.buff + (player.atk || 0);
      const blocked = Math.min(dmg, enemy.block);
      const actualDmg = dmg - blocked;
      enemy.block = Math.max(0, enemy.block - dmg);
      enemy.hp = Math.max(0, enemy.hp - actualDmg);
      attack1Sound.current?.play(); // 클릭 사운드
      setPlayer({ ...player, gauge: newGauge, buff: 0 });
      addMessage(
        `${card.name} 사용! ${enemy.name}에게 ${actualDmg} 데미지 (방어 ${blocked})`
      );
      if (enemy.hp <= 0) {
        deadSound.current?.play(); // 클릭 사운드
        return enemy;
      }
    } else if (card.type === "poison") {
      enemy.poison += card.value;
      attack2Sound.current?.play(); // 클릭 사운드
      setPlayer({ ...player, gauge: newGauge });
      addMessage(`중독! ${enemy.name}에게 ${card.value} 중독`);
    } else if (card.type === "stun") {
      attack1Sound.current?.play(); // 클릭 사운드
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
          deadSound.current?.play(); // 클릭 사운드
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
        const dmg = enemy.damage ?? 6 + Math.floor(Math.random() * 5);
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
        const dmg = enemy.damage ?? 12 + Math.floor(Math.random() * 8);
        const actual = Math.max(0, dmg - newPlayer.block);
        newPlayer.block = Math.max(0, newPlayer.block - dmg);
        newPlayer.hp = Math.max(0, newPlayer.hp - actual);
        addMessage(`${enemy.name}의 강력한 브레스! ${actual} 피해`);
      } else if (enemy.behavior === "bossMixed") {
        const roll = Math.random();
        if (roll < 0.4) {
          const dmg = enemy.damage ?? 12 + Math.floor(Math.random() * 8);
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
      gameOverSound.current?.play(); // 클릭 사운드
      setIsGameOver(true);
      addMessage("💀 게임 오버!");
      saveBestScore(stage);
      return;
    }

    setPlayer({ ...newPlayer, gauge: player.maxGauge });
    setEnemies(newEnemies);
    setHand(drawCards(5));
    addMessage("턴 종료!");
  };

  const nextStage = () => {
    levelSound.current?.play(); // 클릭 사운드
    const newStage = stage + 1;
    setStage(newStage);
    const goldReward = 20 + newStage * 5;
    setPlayer((prev) => ({ ...prev, gold: prev.gold + goldReward }));
    addMessage(`💰 ${goldReward} 골드를 획득했습니다!`);

    if (newStage % 3 === 0) {
      setShowUpgradeChoice(true);
    } else {
      proceedToStage(newStage, player.maxGauge);
    }
  };

  const proceedToStage = (stage, newMaxGauge) => {
    setPlayer((prev) => {
      const updatedStats = applyEquipmentEffects(
        { ...initialPlayer },
        prev.equipment
      );
      const startBlock = updatedStats.startBlock || 0;
      return {
        ...updatedStats,
        hp: updatedStats.maxHp,
        gauge: newMaxGauge,
        maxGauge: newMaxGauge,
        block: startBlock,
        equipment: { ...prev.equipment },
        gold: prev.gold,
      };
    });

    setEnemies(createEnemies(stage));
    setHand(drawCards(5));
    addMessage(`스테이지 ${stage} 시작!`);
    setShowUpgradeChoice(false);
  };

  const handleUpgradeChoice = (choice) => {
    if (choice === "gauge") {
      if (player.gold >= 50) {
        setPlayer((prev) => ({
          ...prev,
          gold: prev.gold - 50,
          maxGauge: prev.maxGauge + 1,
        }));
        addMessage("⚡ 최대 게이지 +1 (50골드)");
      } else {
        addMessage("골드가 부족합니다!");
      }
    } else if (choice === "card") {
      if (player.gold >= 50) {
        setPlayer((prev) => ({
          ...prev,
          gold: prev.gold - 50,
        }));
        upgradeRandomCard();
      } else {
        addMessage("골드가 부족합니다!");
      }
    } else if (choice === "equipment") {
      if (player.gold >= 50) {
        const newEquip = generateGuaranteedEquipment(stage);
        const newEquipment = { ...player.equipment, [newEquip.type]: newEquip };
        const updated = applyEquipmentEffects(
          { ...initialPlayer },
          newEquipment
        );
        const startBlock = updated.startBlock || 0;

        setPlayer({
          ...updated,
          hp: updated.maxHp,
          gauge: updated.maxGauge,
          block: startBlock,
          gold: player.gold - 50,
          equipment: newEquipment,
        });

        addMessage(`🛡 '${newEquip.name}' 장비 구매 완료! (50골드)`);
      } else {
        addMessage("골드가 부족합니다!");
      }
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

  const [showEquipment, setShowEquipment] = useState(false);

  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem("bestScores");
    return saved ? JSON.parse(saved) : [];
  });
  const [showBest, setShowBest] = useState(false);

  const saveBestScore = (stage) => {
    const updated = [...bestScores, stage].sort((a, b) => b - a).slice(0, 5);
    setBestScores(updated);
    localStorage.setItem("bestScores", JSON.stringify(updated));
  };

  const generateGuaranteedEquipment = (stage) => {
    const type =
      equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
    const stat = Math.floor(stage * 2 + Math.random() * 5);
    const effects = {
      투구: { 체력: stat },
      갑옷: { 방어력: stat },
      무기: { 공격력: stat },
      신발: { 방어력: stat },
      장갑: { 공격력: Math.floor(stat / 2) },
    };

    return {
      name: `${type} +${stat}`,
      type,
      effect: effects[type],
    };
  };

  const [showMonsterDex, setShowMonsterDex] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showhelp, setShowhelf] = useState(false);

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
            <div className="header">
              <button onClick={() => setShowEquipment((prev) => !prev)}>
                장비창
              </button>
              <button onClick={() => setShowMonsterDex((prev) => !prev)}>
                몬스터 도감
              </button>
              <h2>스테이지 {stage}</h2>
              <button onClick={() => setShowhelf((prev) => !prev)}>
                도움말
              </button>
              <button onClick={() => setShowBest((prev) => !prev)}>
                {showBest ? "기록 닫기" : "최고기록"}
              </button>
            </div>
            <div className="player">
              ❤️ HP: {player.hp}/{player.maxHp} | 🛡 방어력: {player.block} | ⚡
              게이지: {player.gauge}/{player.maxGauge} | 💪 버프: {player.buff}{" "}
              | 💰 골드: {player.gold}
            </div>

            {!showUpgradeChoice && (
              <div className="enemies">
                <div className="enemies">
                  {enemies.map((enemy, i) => (
                    <div
                      key={enemy.id}
                      className={`enemy ${enemy.hp <= 0 ? "dead" : ""} ${
                        enemy.isBoss ? "boss" : ""
                      }`}
                      onClick={() => handleEnemyClick(i)}
                    >
                      {enemy.image && (
                        <img
                          src={enemy.image}
                          alt={enemy.name}
                          style={{ width: "80px", height: "80px" }}
                        />
                      )}
                      <div>{enemy.name}</div>
                      <div>
                        HP: {enemy.hp} / {enemy.maxHp}
                      </div>
                      <div>⚔ 공격력: {enemy.damage}</div>
                      <div>🛡 저항: {Math.round(enemy.resist * 100)}%</div>
                      {enemy.block > 0 && <div>🛡 방어: {enemy.block}</div>}
                      {enemy.poison > 0 && <div>☠ 중독: {enemy.poison}</div>}
                      {enemy.stun > 0 && <div>💫 기절</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                      (player.atk > 0 || player.buff > 0) && (
                        <>
                          {" "}
                          (실제{" "}
                          {card.value + (player.atk || 0) + (player.buff || 0)})
                        </>
                      )}
                  </div>
                </div>
              ))}
            </div>

            {selectedCard?.type.includes("attack") && (
              <div className="select-target-hint">⚔ 적을 클릭하세요!</div>
            )}

            {showUpgradeChoice && (
              <div className="choice-popup">
                <h3>상점 보상 선택 (50골드)</h3>
                <button onClick={() => handleUpgradeChoice("gauge")}>
                  ⚡ 최대 게이지 +1
                </button>
                <button onClick={() => handleUpgradeChoice("card")}>
                  🃏 무작위 카드 강화
                </button>
                <button onClick={() => handleUpgradeChoice("equipment")}>
                  🛡 무작위 장비 구매
                </button>
              </div>
            )}

            {showEquipment && (
              <div className="equipment-window">
                💪 공격력: {player.atk || 0}
                🛡 시작 방어력: {player.startBlock || 0}
                <h3>🛡 현재 착용 중인 장비</h3>
                <ul>
                  {equipmentTypes.map((type) => {
                    const item = player.equipment[type];
                    return (
                      <li key={type}>
                        <strong>{type}:</strong>{" "}
                        {item
                          ? `${item.name} (${Object.entries(item.effect)
                              .map(([k, v]) => `${k}+${v}`)
                              .join(", ")})`
                          : "없음"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {showBest && (
              <div className="best-score-window">
                <h3>🏆 최고 스테이지 기록</h3>
                <ol>
                  {bestScores.length > 0 ? (
                    bestScores.map((score, idx) => (
                      <li key={idx}>스테이지 {score}</li>
                    ))
                  ) : (
                    <p>기록 없음</p>
                  )}
                </ol>
              </div>
            )}

            {showhelp && (
              <div className="help-window">
                <h3>도움말</h3>
                <ul>
                  <li>HP:투구로 증가</li>
                  <li>공격력:무기,장갑으로 증가</li>
                  <li>방어력:갑옷,신발로 증가</li>
                  <li>저항:상태이상 저항확률</li>
                  <li>중독:매턴 데미지</li>
                  <li>기절:1턴간 행동불가</li>
                </ul>
              </div>
            )}

            {showMonsterDex && (
              <div className="dex-window">
                <h3>몬스터 도감</h3>
                <div className="dex-list">
                  {monsterTypes.map((mon, idx) => (
                    <div key={idx} className="dex-card">
                      <img
                        src={getMonsterImageByType(mon.name)}
                        alt={mon.name}
                        width={60}
                      />
                      <div>
                        <strong>{mon.name}</strong>
                      </div>
                      <div>💖 HP: {mon.hp(1)}</div>
                    </div>
                  ))}
                  {bossTypes.map((boss, idx) => (
                    <div key={idx} className="dex-card">
                      <img
                        src={getMonsterImageByType(boss.name)}
                        alt={boss.name}
                        width={60}
                      />
                      <div>
                        <strong>{boss.name}</strong>
                      </div>
                      <div>💖 HP: {boss.hp(stage)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bottom-bar">
              <button onClick={() => setShowDeck((prev) => !prev)}>덱</button>
              {enemies.every((e) => e.hp <= 0) ? (
                <button onClick={nextStage} className="end-turn">
                  다음 스테이지
                </button>
              ) : (
                <button onClick={endTurn} className="end-turn">
                  턴 종료
                </button>
              )}
              <button onClick={() => setShowLog((prev) => !prev)}>로그</button>
            </div>
          </>
        )}
      </div>

      {showDeck && (
        <div className="deck-window">
          <h3>현재 덱</h3>
          <ul>
            {deck.map((card, idx) => (
              <li key={idx}>
                <strong>{card.name}</strong> (Lv.{card.level}, Cost: {card.cost}
                ) - {card.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showLog && (
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className="message">
              {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TurnBasedCardRPG;
