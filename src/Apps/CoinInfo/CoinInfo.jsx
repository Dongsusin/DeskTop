import React, { useEffect, useState } from "react";
import "./CoinInfo.css";

const CoinInfo = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,litecoin,cardano"
      );
      if (!res.ok) throw new Error("API 호출 실패");
      const data = await res.json();
      setCoins(data);
      if (data.length > 0) {
        setLastUpdated(data[0].last_updated);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  if (loading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error">에러: {error}</div>;

  // lastUpdated를 보기 좋은 형식으로 변환 (예: YYYY-MM-DD HH:mm)
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="coin-container">
      <h1>코인 시세 정보</h1>
      {lastUpdated && (
        <div className="updated-date">
          (기준 날짜: {formatDate(lastUpdated)})
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>코인</th>
            <th>현재가 (USD)</th>
            <th>시가총액</th>
            <th>24시간 변동률</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td className="coin-name">
                <img src={coin.image} alt={coin.name} />
                {coin.name}
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td
                className={coin.price_change_percentage_24h > 0 ? "up" : "down"}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinInfo;
