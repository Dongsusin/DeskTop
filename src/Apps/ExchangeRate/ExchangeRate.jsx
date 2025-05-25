import React, { useEffect, useState } from "react";
import "./ExchangeRate.css";

const ExchangeRate = () => {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  const currencyNamesKR = {
    USD: "미국 달러",
    EUR: "유로",
    KRW: "대한민국 원",
    JPY: "일본 엔",
    GBP: "영국 파운드",
    CNY: "중국 위안",
    AUD: "호주 달러",
    CAD: "캐나다 달러",
    CHF: "스위스 프랑",
    HKD: "홍콩 달러",
    NZD: "뉴질랜드 달러",
    SEK: "스웨덴 크로나",
    NOK: "노르웨이 크로네",
    DKK: "덴마크 크로네",
    SGD: "싱가포르 달러",
    MXN: "멕시코 페소",
    ZAR: "남아프리카 랜드",
    TRY: "터키 리라",
    RUB: "러시아 루블",
    BRL: "브라질 헤알",
    INR: "인도 루피",
    IDR: "인도네시아 루피아",
    MYR: "말레이시아 링깃",
    PHP: "필리핀 페소",
    THB: "태국 바트",
    PLN: "폴란드 즈워티",
    CZK: "체코 코루나",
    HUF: "헝가리 포린트",
    ILS: "이스라엘 셰켈",
    SAR: "사우디 리얄",
    AED: "아랍에미리트 디르함",
  };

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
          console.error("API 에러:", data["error-type"]);
        }
      } catch (error) {
        console.error("환율 데이터를 가져오는 중 오류 발생:", error);
        setRates({});
        setCurrencies([]);
      }
      setLoading(false);
    };

    fetchRates();
  }, [base]);

  return (
    <div className="ExchangeRate">
      <h1>환율 비교</h1>
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
              <h2>
                {cur}
                <br />
                <small className="currency-name">
                  ({currencyNamesKR[cur] || ""})
                </small>
              </h2>
              <p>
                1 {base} = {rates[cur]?.toFixed(4) || "N/A"} {cur}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExchangeRate;
