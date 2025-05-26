import { useState } from "react";
import "./Seven.css";

const heroData = {
  스페셜: {
    세븐나이츠: [
      "루디",
      "아일린",
      "레이첼",
      "델론즈",
      "스파이크",
      "제이브",
      "크리스",
      "바네사",
    ],
    "(구)세븐나이츠": ["파이", "로지", "쥬리"],
    사항: ["에이스"],
    "????": ["실베스타"],
  },
  일반: {
    에반원정대: [
      "에반",
      "카린",
      "유리",
      "리",
      "유이",
      "아리엘",
      "쥬피",
      "스니퍼",
      "헬레니아",
      "헤브니아",
    ],
    모험가: ["카론", "빅토리아", "루시", "벨리카", "실비아", "조커"],
    테라영지: ["룩", "챈슬러", "메이", "엘리스", "아라곤", "노호", "클로에"],
    성십자단: ["루리", "니아", "에스파다", "세인", "지크"],
    그림자단: ["제인", "블랙로즈", "세라", "발리스타"],
  },
  아소드대륙: {
    "신비의 숲": ["푸키", "아리", "포포", "페페", "폰", "베스킨", "호킨"],
    "침묵의 광산": ["셀롭", "실롭", "나미", "코쿤", "스모키", "바벨", "라쿤"],
    "화염의 사막": ["리키", "로울", "라울", "쿠퍼", "리퍼", "레오"],
    "암흑의 무덤": ["찰스", "스컬", "스커드", "데릭", "엘린", "엘렌", "베인"],
    "용의 유적지": ["자크", "토토", "로토", "벨라", "하울", "자스", "클레오"],
    "눈보라의 대지": [
      "프루나",
      "프로스",
      "웬디",
      "카이",
      "아칸",
      "구피",
      "라니아",
    ],
    "복수자의 지옥": ["해피", "바론", "아론", "알리", "클로프", "사라", "녹스"],
  },
  아이사대륙: {
    "달빛의 섬": ["리나", "코코", "캐티", "진", "레이"],
    "천자의 땅 서쪽": ["소이", "풍연"],
    "천자의 땅 동쪽": ["유신", "비담"],
    "어둠의 안식처": ["아수라", "파스칼"],
  },
  기타: {
    특수영웅: ["레아", "피나"],
  },
};

export default function Hero() {
  const [selectedGroup, setSelectedGroup] = useState("스페셜");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    setSelectedCharacter(null);
  };

  return (
    <div className="Hero-container">
      <h2 className="Hero-title">도감</h2>

      <div className="Hero-button-group">
        {Object.keys(heroData).map((group) => (
          <button
            key={group}
            className={`Hero-button ${selectedGroup === group ? "active" : ""}`}
            onClick={() => handleGroupChange(group)}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="Hero-all-sections">
        {Object.entries(heroData[selectedGroup]).map(
          ([subGroup, characters]) => (
            <div key={subGroup} className="Hero-sub-section">
              <h3 className="Hero-sub-title">{subGroup}</h3>
              <ul className="Hero-list">
                {characters.map((name) => (
                  <li className="Hero-list-item" key={name}>
                    <img
                      src={`/image/세븐나이츠/캐릭터/카드/${selectedGroup}/${name}.png`}
                      alt={name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}
