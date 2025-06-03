import React, { useEffect, useState } from "react";
import CoinTab from "./components/CoinTab";
import ExchangeTab from "./components/ExchangeTab";
import StockTab from "./components/StockTab";
import "./ExchangeRate.css";

export default function ExchangeRate() {
  const [tab, setTab] = useState("coin");

  return (
    <div className="dashboard-container">
      <h1 className="main-title">금융 정보 대시보드</h1>
      <div className="tabs">
        <button
          onClick={() => setTab("coin")}
          className={tab === "coin" ? "active" : ""}
        >
          💰 코인
        </button>
        <button
          onClick={() => setTab("exchange")}
          className={tab === "exchange" ? "active" : ""}
        >
          💱 환율
        </button>
        <button
          onClick={() => setTab("stock")}
          className={tab === "stock" ? "active" : ""}
        >
          📈 주식
        </button>
      </div>

      <div className="tab-content">
        {tab === "coin" && <CoinTab />}
        {tab === "exchange" && <ExchangeTab />}
        {tab === "stock" && <StockTab />}
      </div>
    </div>
  );
}
