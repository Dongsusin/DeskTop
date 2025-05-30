import React, { useState, useEffect } from "react";
import "./Travel.css";

const API_URL = "https://opensky-network.org/api/states/all";

const Travel = () => {
  const [page, setPage] = useState("flight");
  const [origin, setOrigin] = useState("ICN");
  const [destination, setDestination] = useState("NRT");
  const [flights, setFlights] = useState([]);
  const [flightLoading, setFlightLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [travelLoading, setTravelLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchFlights = async () => {
    setFlightLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const filtered = (data.states || []).filter((flight) => {
        const callsign = flight[1] || "";
        const originCountry = flight[2] || "";
        return (
          originCountry.includes("Korea") &&
          (callsign.includes("JAL") ||
            callsign.includes("ANA") ||
            callsign.includes("JJA") ||
            callsign.includes("KAL"))
        );
      });
      setFlights(filtered);
    } catch (err) {
      setFlights([]);
    } finally {
      setFlightLoading(false);
    }
  };

  const fetchCities = async (query = "seoul") => {
    setTravelLoading(true);
    setError("");
    setSelectedCity(null);
    try {
      const res = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${query}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "56c0821a23msh3d65f643f7a2cd9p14b24ejsn2912282648fd",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      setCities(data.data || []);
    } catch (e) {
      setError("도시 정보를 불러오는 데 실패했습니다.");
    }
    setTravelLoading(false);
  };

  const fetchCityImage = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${cityName}&client_id=AQPoHBzv-aqVMwY6iB7oHXSvRWcGRTA16WGinMFg84s`
      );
      const data = await res.json();
      const firstImage = data.results?.[0]?.urls?.regular;
      setImageUrl(firstImage || "");
    } catch (e) {
      setImageUrl("");
    }
  };

  const handleSelectCity = async (city) => {
    setSelectedCity(city);
    setImageUrl("");
    await fetchCityImage(city.name);
  };

  useEffect(() => {
    if (page === "flight") fetchFlights();
    if (page === "travel") fetchCities();
  }, [page]);

  return (
    <div className="Travel">
      <div className="nav-buttons">
        <button
          onClick={() => setPage("flight")}
          className={page === "flight" ? "active" : ""}
        >
          항공편 조회
        </button>
        <button
          onClick={() => setPage("travel")}
          className={page === "travel" ? "active" : ""}
        >
          여행지 검색
        </button>
      </div>

      {page === "flight" && (
        <section className="flight-container">
          <h1>항공편 조회</h1>
          <div className="input-group">
            <input
              type="text"
              placeholder="출발지 (예: ICN)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            />
            <input
              type="text"
              placeholder="도착지 (예: NRT)"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
            />
            <button onClick={fetchFlights}>검색</button>
          </div>
          {flightLoading ? (
            <p>항공편을 조회 중입니다...</p>
          ) : (
            <ul className="flight-list">
              {flights.length === 0 ? (
                <li>해당 조건에 맞는 항공편이 없습니다.</li>
              ) : (
                flights.map((f, idx) => (
                  <li key={idx} className="flight-card">
                    <strong>항공편:</strong> {f[1]?.trim() || "N/A"} <br />
                    <strong>출발국:</strong> {f[2]} <br />
                    <strong>고도:</strong> {Math.round((f[7] || 0) * 3.281)} ft{" "}
                    <br />
                    <strong>속도:</strong> {Math.round((f[9] || 0) * 3.6)} km/h
                  </li>
                ))
              )}
            </ul>
          )}
        </section>
      )}

      {page === "travel" && (
        <section className="Travel">
          <h1>여행지 검색</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="도시이름 입력"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchCities(input)}
            />
            <button onClick={() => fetchCities(input)}>검색</button>
          </div>

          {travelLoading && <p>로딩 중...</p>}
          {error && <p className="error">{error}</p>}

          {!travelLoading && !selectedCity && (
            <div className="grid">
              {cities.map((city) => (
                <div
                  key={city.id}
                  className="city-card"
                  onClick={() => handleSelectCity(city)}
                >
                  <h2>
                    {city.name}, {city.country}
                  </h2>
                  <p>
                    <strong>지역:</strong> {city.region}
                  </p>
                  <p>
                    <strong>인구:</strong>{" "}
                    {city.population?.toLocaleString() || "정보 없음"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {selectedCity && (
            <div className="detail-card">
              <button onClick={() => setSelectedCity(null)}>← 돌아가기</button>
              <h2>
                {selectedCity.name}, {selectedCity.country}
              </h2>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={`${selectedCity.name} 이미지`}
                  className="city-image"
                />
              )}
              <p>
                <strong>지역:</strong> {selectedCity.region}
              </p>
              <p>
                <strong>위도:</strong> {selectedCity.latitude}
              </p>
              <p>
                <strong>경도:</strong> {selectedCity.longitude}
              </p>
              <p>
                <strong>인구:</strong>{" "}
                {selectedCity.population?.toLocaleString() || "정보 없음"}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedCity.latitude},${selectedCity.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="map-button"
              >
                Google Maps에서 보기
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Travel;
