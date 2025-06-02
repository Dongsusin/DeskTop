import React, { useEffect, useState } from "react";
import "./ExchangeRate.css";

export default function ExchangeRate() {
  const [tab, setTab] = useState("coin");

  const [coins, setCoins] = useState([]);
  const [coinLoading, setCoinLoading] = useState(true);
  const [coinError, setCoinError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState({});
  const [rateLoading, setRateLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [stockError, setStockError] = useState(null);
  const [stockLoading, setStockLoading] = useState(false);

  const API_KEY = "d0pgs09r01qgccu9225gd0pgs09r01qgccu92260";

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
    TWD: "대만 달러",
    AFN: "아프가니스탄 아프기니",
    ALL: "알바니아 렉",
    AMD: "아르메니아 드람",
    ARS: "아르헨티나 페소",
    BGN: "불가리아 레프",
    BHD: "바레인 디나르",
    BOB: "볼리비아 볼리비아노",
    CLP: "칠레 페소",
    COP: "콜롬비아 페소",
    CRC: "코스타리카 콜론",
    DOP: "도미니카 페소",
    EGP: "이집트 파운드",
    GHS: "가나 세디",
    GTQ: "과테말라 케찰",
    HNL: "온두라스 렘피라",
    JMD: "자메이카 달러",
    KES: "케냐 실링",
    ANG: "네덜란드령 안틸레스 길더",
    KZT: "카자흐스탄 텡게",
    KPW: "조선민주주의인민공화국 원",
    KWD: "쿠웨이트 디나르",
    LBP: "레바논 파운드",
    LKR: "스리랑카 루피",
    MAD: "모로코 디르함",
    MDL: "몰도바 레우",
    MNT: "몽골 투그릭",
    MUR: "모리셔스 루피",
    NAD: "나미비아 달러",
    NGN: "나이지리아 나이라",
    NIO: "니카라과 코르도바",
    PAB: "파나마 발보아",
    PEN: "페루 솔",
    PYG: "파라과이 과라니",
    RON: "루마니아 레우",
    SYP: "시리아 파운드",
    UAH: "우크라이나 그리브나",
    UYU: "우루과이 페소",
    VEF: "베네수엘라 볼리바르",
    VND: "베트남 동",
    XAF: "중앙아프리카 CFA 프랑",
    XCD: "동카리브 달러",
    XOF: "서아프리카 CFA 프랑",
    XPF: "CFP 프랑",
    ZMW: "잠비아 콰차",
    XDR: "특별인출권 (SDR)",
    AOA: "아프리카 연합 (AU) 유닛",
    BDT: "방글라데시 타카",
    BMD: "버뮤다 달러",
    BND: "브루나이 달러",
    BYN: "벨라루스 루블",
    CDF: "콩고 프랑",
    DJF: "지부티 프랑",
    DZD: "알제리 디나르",
    FJD: "피지 달러",
    GMD: "감비아 달러",
    GYD: "가이아나 달러",
    IQD: "이라크 디나르",
    JOD: "요르단 디나르",
    KGS: "키르기스스탄 솜",
    KMF: "코모로 프랑",
    LAK: "라오스 킵",
    LRD: "라이베리아 달러",
    LYD: "리비아 디나르",
    MZN: "모잠비크 메티칼",
    OMR: "오만 리알",
    QAR: "카타르 리얄",
    RWF: "르완다 프랑",
    SLL: "시에라리온 리온",
    SOS: "소말리아 실링",
    SSP: "남수단 파운드",
    TND: "튀니지 디나르",
    TZS: "탄자니아 실링",
    UGX: "우간다 실링",
    VUV: "바누아투 바투",
    WST: "사모아 탈라",
    YER: "예멘 리얄",
    ZWL: "짐바브웨 달러",
    AWG: "아루바 플로린",
    BZD: "벨리즈 달러",
    CUC: "쿠바 환전 페소",
    FKP: "포클랜드 제도 파운드",
    GIP: "지브롤터 파운드",
    HTG: "아이티 구르드",
    KHR: "캄보디아 리엘",
    LSL: "레소토 로티",
    MOP: "마카오 파타카",
    MVR: "몰디브 루피아",
    NPR: "네팔 루피",
    RSD: "세르비아 디나르",
    SBD: "솔로몬 제도 달러",
    SVC: "엘살바도르 콜론",
    TMT: "투르크메니스탄 마나트",
    TJS: "타지키스탄 소모니",
    UZS: "우즈베키스탄 숨",
    VES: "베네수엘라 볼리바르 소베라노",
    AZN: "아제르바이잔 마나트",
    BAM: "보스니아 헤르체고비나 마르카",
    BBD: "바베이도스 달러",
    BIF: "부룬디 프랑",
    BSD: "바하마 달러",
    BTN: "부탄 눌트럼",
    BWP: "보츠와나 풀라",
    CUP: "쿠바 페소",
    CVE: "카보베르데 에스쿠도",
    ERN: "에리트레아 나크파",
    ETB: "에티오피아 비르",
    FOK: "페로 제도 크로나",
    GEL: "그루지야 라리",
    GGP: "건지 파운드",
    GNF: "기니 프랑",
    HRK: "크로아티아 쿠나",
    IMP: "맨 섬 파운드",
    IRR: "이란 리얄",
    ISK: "아이슬란드 크로나",
    JEP: "저지 섬 파운드",
    KID: "키리바시 달러",
    KYD: "케이맨 제도 달러",
    MGA: "마다가스카르 아리아리",
    MKD: "마케도니아 디나르",
    MMK: "미얀마 키얏",
    MRU: "모리타니 우기야",
    MWK: "말라위 콰차",
    PGK: "파키스탄 루피",
    PKR: "파키스탄 루피",
    SCR: "세이셸 루피",
    SDG: "수단 파운드",
    SHP: "세인트헬레나 파운드",
    SLE: "시에라리온 리온",
    SRD: "수리남 달러",
    STN: "상투메 프린시페 도브라",
    SZL: "에스와티니 릴랑게니",
    TTD: "트리니다드 토바고 달러",
    TVD: "투발루 달러",
    XCG: "코모로 프랑",
  };
  const fetchCoins = async () => {
    try {
      setCoinLoading(true);
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
      setCoinError(err.message);
    } finally {
      setCoinLoading(false);
    }
  };

  const fetchRates = async () => {
    setRateLoading(true);
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
    } catch (error) {
      setRates({});
      setCurrencies([]);
    }
    setRateLoading(false);
  };

  const fetchStockData = async () => {
    if (!symbol) return;
    setStockLoading(true);
    setStockError(null);
    setStockData(null);
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${API_KEY}`
      );
      const data = await res.json();
      if (data && data.c) {
        setStockData(data);
      } else {
        setStockError("해당 주식 정보를 찾을 수 없습니다.");
      }
    } catch (e) {
      setStockError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setStockLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    fetchRates();
  }, [base]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    return d.toLocaleString();
  };

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
        {tab === "coin" && (
          <div className="coin-container">
            <h2>코인 시세 정보</h2>
            {lastUpdated && (
              <div className="updated-date">
                (기준: {formatDate(lastUpdated)})
              </div>
            )}
            {coinLoading ? (
              <div>로딩 중...</div>
            ) : coinError ? (
              <div className="error">에러: {coinError}</div>
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
                      <td className="pc">
                        ${coin.market_cap.toLocaleString()}
                      </td>
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
        )}

        {tab === "exchange" && (
          <div className="exchange-container">
            <h2>환율 정보</h2>
            <select value={base} onChange={(e) => setBase(e.target.value)}>
              {[base, ...currencies].map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
            {rateLoading ? (
              <p>로딩 중...</p>
            ) : (
              <div className="rates">
                {currencies.map((cur) => (
                  <div key={cur} className="rate-card">
                    <h3>
                      {cur} <small>({currencyNamesKR[cur] || ""})</small>
                    </h3>
                    <p>
                      1 {base} = {rates[cur]?.toFixed(4)} {cur}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "stock" && (
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
            {stockLoading && <div>불러오는 중...</div>}
            {stockError && <div className="error">{stockError}</div>}
            {stockData && (
              <div className="info">
                <p>
                  <strong>현재가:</strong> ${stockData.c.toFixed(2)}
                </p>
                <p>
                  <strong>변동:</strong> ${stockData.d.toFixed(2)}
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
          </div>
        )}
      </div>
    </div>
  );
}
