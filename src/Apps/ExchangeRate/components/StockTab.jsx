import React, { useState } from "react";

export default function StockTab() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "d0pgs09r01qgccu9225gd0pgs09r01qgccu92260";

  const fetchStockData = async () => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${API_KEY}`
      );
      const result = await res.json();
      if (result && result.c) {
        setData(result);
      } else {
        setError("해당 주식 정보를 찾을 수 없습니다.");
      }
    } catch {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-container">
      <h2>주식 정보</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="주식심볼 입력 (예: AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchStockData()}
        />
        <button onClick={fetchStockData}>검색</button>
      </div>
      {loading && <div>불러오는 중...</div>}
      {error && <div className="error">{error}</div>}
      {data && (
        <div className="info">
          <p>
            <strong>현재가:</strong> ${data.c.toFixed(2)}
          </p>
          <p>
            <strong>변동:</strong> ${data.d.toFixed(2)}
          </p>
          <p>
            <strong>변동률:</strong> {data.dp.toFixed(2)}%
          </p>
          <p>
            <strong>시가:</strong> ${data.o.toFixed(2)}
          </p>
          <p>
            <strong>고가:</strong> ${data.h.toFixed(2)}
          </p>
          <p>
            <strong>저가:</strong> ${data.l.toFixed(2)}
          </p>
          <p>
            <strong>전일 종가:</strong> ${data.pc.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
