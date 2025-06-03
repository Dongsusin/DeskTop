import React, { useEffect, useState } from "react";

export default function ExchangeTab() {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        const data = await res.json();
        if (data.result === "success") {
          setRates(data.rates || {});
          setCurrencies(Object.keys(data.rates).filter((cur) => cur !== base));
        } else {
          setRates({});
          setCurrencies([]);
        }
      } catch {
        setRates({});
        setCurrencies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [base]);

  return (
    <div className="exchange-container">
      <h2>환율 정보</h2>
      <select value={base} onChange={(e) => setBase(e.target.value)}>
        {[base, ...currencies].map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="rates">
          {currencies.map((cur) => (
            <div key={cur} className="rate-card">
              <h3>{cur}</h3>
              <p>
                1 {base} = {rates[cur]?.toFixed(4)} {cur}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
