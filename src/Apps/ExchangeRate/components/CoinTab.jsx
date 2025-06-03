import React, { useEffect, useState } from "react";

export default function CoinTab() {
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

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    return d.toLocaleString();
  };

  return (
    <div className="coin-container">
      <h2>코인 시세 정보</h2>
      {lastUpdated && (
        <div className="updated-date">(기준: {formatDate(lastUpdated)})</div>
      )}
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div className="error">에러: {error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>코인</th>
              <th>현재가 (USD)</th>
              <th className="pc">시가총액</th>
              <th>24시간 변동률</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <img src={coin.image} alt={coin.name} width={20} />{" "}
                  {coin.name}
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td className="pc">${coin.market_cap.toLocaleString()}</td>
                <td
                  className={
                    coin.price_change_percentage_24h > 0 ? "up" : "down"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
