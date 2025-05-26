import React, { useState, useEffect } from "react";
import "./Travel.css";

const Travel = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchCities = async (query = "seoul") => {
    setLoading(true);
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
    setLoading(false);
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
    fetchCities(); // 초기 검색
  }, []);

  return (
    <div className="Travel">
      <h1>🌍 여행지 검색</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="도시 이름을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchCities(input)}
        />
        <button onClick={() => fetchCities(input)}>검색</button>
      </div>

      {loading && <p>로딩 중...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !selectedCity && (
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
            🗺️ Google Maps에서 보기
          </a>
        </div>
      )}
    </div>
  );
};

export default Travel;
