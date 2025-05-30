import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Maple.css";

const API_KEY =
  "test_7e0ba70823ab4904a38585c90c281eb612d5528b352287af7549b1b1fae01e53efe8d04e6d233bd35cf2fabdeb93fb0d";

function Maple() {
  const [nickname, setNickname] = useState("");
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("mapleSearchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveSearchHistory = (newHistory) => {
    setSearchHistory(newHistory);
    localStorage.setItem("mapleSearchHistory", JSON.stringify(newHistory));
  };

  const handleSearch = async (name = nickname) => {
    if (!name.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    setError("");
    setCharacterData(null);
    setLoading(true);

    try {
      const ocidRes = await axios.get(
        `https://open.api.nexon.com/maplestory/v1/id?character_name=${name}`,
        {
          headers: { "x-nxopen-api-key": API_KEY },
        }
      );

      const ocid = ocidRes.data.ocid;

      const charRes = await axios.get(
        `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
        {
          headers: { "x-nxopen-api-key": API_KEY },
        }
      );

      setCharacterData(charRes.data);

      const updatedHistory = [
        name,
        ...searchHistory.filter((n) => n !== name),
      ].slice(0, 10);
      saveSearchHistory(updatedHistory);
    } catch (err) {
      console.error(err);
      setError("캐릭터를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getExpPercent = () => {
    if (!characterData?.character_exp || !characterData?.next_exp) return 0;
    return Math.min(
      100,
      Math.round((characterData.character_exp / characterData.next_exp) * 100)
    );
  };

  return (
    <div className="maple-container">
      <h1>메이플 캐릭터 검색</h1>
      <div className="search">
        <input
          type="text"
          placeholder="캐릭터명을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={() => handleSearch()}>검색</button>
      </div>

      {loading && <p>검색 중입니다...</p>}
      {error && <p className="error">{error}</p>}

      {characterData && (
        <div className="result">
          <img src={characterData.character_image} alt="캐릭터 이미지" />
          <div className="info">
            <h2>{characterData.character_name}</h2>
            <p>레벨: {characterData.character_level}</p>
            <p>직업: {characterData.character_class}</p>
            <p>월드: {characterData.world_name}</p>
            {characterData.guild_name && (
              <p>길드: {characterData.guild_name}</p>
            )}

            {characterData.character_exp !== undefined &&
              characterData.next_exp !== undefined && (
                <div className="exp-bar">
                  <div
                    className="exp-progress"
                    style={{ width: `${getExpPercent()}%` }}
                  />
                  <span>{getExpPercent()}%</span>
                </div>
              )}
          </div>
        </div>
      )}

      {searchHistory.length > 0 && (
        <div className="search-history">
          <h3>최근 검색어</h3>
          <ul>
            {searchHistory.map((name) => (
              <li key={name} onClick={() => handleSearch(name)}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Maple;
