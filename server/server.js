// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3001;
const DATA_FILE = "rankings.json";

app.use(cors());
app.use(bodyParser.json());

// 랭킹 데이터 파일 없으면 생성
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// 랭킹 가져오기
app.get("/rankings", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  // 점수 높은 순으로 정렬
  const sorted = data.sort((a, b) => b.score - a.score).slice(0, 10); // 상위 10명
  res.json(sorted);
});

// 랭킹 추가
app.post("/rankings", (req, res) => {
  const { username, score } = req.body;

  if (!username || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  data.push({ username, score });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  const sorted = data.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json(sorted);
});

app.listen(PORT, () => {
  console.log(`✅ Snake 랭킹 서버가 http://localhost:${PORT} 에서 실행 중`);
});
