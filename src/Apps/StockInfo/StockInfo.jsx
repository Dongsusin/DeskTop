import React, { useState } from "react";
import "./StockInfo.css";

const API_KEY = "d0pgs09r01qgccu9225gd0pgs09r01qgccu92260";

export default function StockInfo() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchStockData() {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    setStockData(null);
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${API_KEY}`
      );
      const data = await res.json();

      if (data && data.c) {
        setStockData(data);
      } else {
        setError("해당 주식 정보를 찾을 수 없습니다.");
      }
    } catch (e) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stock-container">
      <h1>주식 정보 조회 (Finnhub API)</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="주식심볼 입력"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchStockData();
          }}
        />
        <button onClick={fetchStockData}>검색</button>
      </div>

      <div className="symbol-examples">
        <p>
          예시: <code>AAPL</code> (Apple), <code>MSFT</code> (Microsoft),
          <code>TSLA</code> (Tesla)
        </p>
      </div>

      {loading && <div className="loading">불러오는 중...</div>}

      {error && <div className="error">{error}</div>}

      {stockData && (
        <div className="info" aria-live="polite">
          <p>
            <strong>현재가:</strong> ${stockData.c.toFixed(2)}
          </p>
          <p>
            <strong>변동(전일 대비):</strong> ${stockData.d.toFixed(2)}
          </p>
          <p>
            <strong>변동률:</strong> {stockData.dp.toFixed(2)}%
          </p>
          <p>
            <strong>시가:</strong> ${stockData.o.toFixed(2)}
          </p>
          <p>
            <strong>고가:</strong> ${stockData.h.toFixed(2)}
          </p>
          <p>
            <strong>저가:</strong> ${stockData.l.toFixed(2)}
          </p>
          <p>
            <strong>전일 종가:</strong> ${stockData.pc.toFixed(2)}
          </p>
        </div>
      )}

      <div className="footer">데이터 제공: Finnhub API</div>
    </div>
  );
}
