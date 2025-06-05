export const typeKoMap = {
  normal: "노말",
  fire: "불꽃",
  water: "물",
  electric: "전기",
  grass: "풀",
  ice: "얼음",
  fighting: "격투",
  poison: "독",
  ground: "땅",
  flying: "비행",
  psychic: "에스퍼",
  bug: "벌레",
  rock: "바위",
  ghost: "고스트",
  dragon: "드래곤",
  dark: "악",
  steel: "강철",
  fairy: "페어리",
};

export const typeColorMap = {
  노말: "#A8A878",
  불꽃: "#F08030",
  물: "#6890F0",
  전기: "#F8D030",
  풀: "#78C850",
  얼음: "#98D8D8",
  격투: "#C03028",
  독: "#A040A0",
  땅: "#E0C068",
  비행: "#A890F0",
  에스퍼: "#F85888",
  벌레: "#A8B820",
  바위: "#B8A038",
  고스트: "#705898",
  드래곤: "#7038F8",
  악: "#705848",
  강철: "#B8B8D0",
  페어리: "#EE99AC",
};

export const statNameMap = {
  hp: "체력",
  attack: "공격",
  defense: "방어",
  "special-attack": "특공",
  "special-defense": "특방",
  speed: "스피드",
};

export const getTypeGradient = (types) => {
  const colors = types.map((t) => typeColorMap[t]);
  if (colors.length === 1) return colors[0];
  return `linear-gradient(135deg, ${colors.join(", ")})`;
};
