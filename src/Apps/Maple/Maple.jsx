import React, { useState } from "react";
import axios from "axios";
import "./Maple.css";

const API_KEY =
  "test_7e0ba70823ab4904a38585c90c281eb612d5528b352287af7549b1b1fae01e53efe8d04e6d233bd35cf2fabdeb93fb0d"; // 실제 키로 바꿔주세요

function Maple() {
  const [nickname, setNickname] = useState("");
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setCharacterData(null);
    try {
      // 1단계: 닉네임으로 ocid 검색
      const ocidRes = await axios.get(
        `https://open.api.nexon.com/maplestory/v1/id?character_name=${nickname}`,
        {
          headers: { "x-nxopen-api-key": API_KEY },
        }
      );

      const ocid = ocidRes.data.ocid;

      // 2단계: ocid로 캐릭터 기본 정보 조회
      const charRes = await axios.get(
        `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
        {
          headers: { "x-nxopen-api-key": API_KEY },
        }
      );

      setCharacterData(charRes.data);
    } catch (err) {
      console.error(err);
      setError("캐릭터를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="container">
      <h1>메이플 캐릭터 검색</h1>
      <div className="search">
        <input
          type="text"
          placeholder="캐릭터명을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {error && <p className="error">{error}</p>}

      {characterData && (
        <div className="result">
          <img src={characterData.character_image} alt="캐릭터 이미지" />
          <div className="info">
            <h2>{characterData.character_name}</h2>
            <p>레벨: {characterData.character_level}</p>
            <p>직업: {characterData.character_class}</p>
            <p>월드: {characterData.world_name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Maple;
