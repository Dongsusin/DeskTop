import { useEffect, useState } from "react";
import "./Weather.css";

const API_KEY = "e6d02aec03da2632c5505afa1f2670ec";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [showForecast, setShowForecast] = useState(false);
  const [city, setCity] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setErrorMsg("위치 정보를 가져오는 데 실패했습니다.");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    const weatherDiv = document.querySelector(".weather");
    if (weatherDiv) {
      weatherDiv.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    speechSynthesis.speak(utterance);
  };

  const fetchWeatherByCoords = (lat, lon) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) throw new Error(data.message);
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          desc: data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          main: data.weather[0].main,
        });
        setErrorMsg(null);
        fetchForecast(lat, lon);
      })
      .catch(() => {
        setErrorMsg("날씨 정보를 불러오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  };

  const fetchForecast = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    )
      .then((res) => res.json())
      .then((data) => {
        const dailyData = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyData);
      });
  };

  const fetchWeatherByCity = () => {
    if (!city) return;
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) throw new Error(data.message);
        fetchWeatherByCoords(data.coord.lat, data.coord.lon);
      })
      .catch(() => {
        setErrorMsg("도시를 찾을 수 없습니다.");
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherByCity();
    }
  };

  const addToFavorites = () => {
    if (!weatherData?.city || favorites.includes(weatherData.city)) return;
    const updated = [...favorites, weatherData.city];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFromFavorites = (cityToRemove) => {
    const updated = favorites.filter((fav) => fav !== cityToRemove);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const getRecommendation = (main) => {
    switch (main.toLowerCase()) {
      case "rain":
        return "☔ 우산을 챙기세요!";
      case "clear":
        return "😎 선크림을 바르세요!";
      case "snow":
        return "❄️ 미끄럼 주의!";
      case "clouds":
        return "☁️ 산책하기 좋은 날이에요.";
      default:
        return "🍃 좋은 하루 보내세요!";
    }
  };

  const handleSpeak = () => {
    if (!weatherData) return;
    const text = `${weatherData.city}의 현재 날씨는 ${
      weatherData.desc
    }, 온도는 ${weatherData.temp}도입니다. ${getRecommendation(
      weatherData.main
    )}`;
    speak(text);
  };

  return (
    <div className="weather">
      <h1>날씨 앱</h1>

      <div className="controls">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="도시 이름 입력"
        />
        <button onClick={fetchWeatherByCity}>검색</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ 라이트모드" : "🌙 다크모드"}
        </button>
        <button onClick={() => setShowForecast(!showForecast)}>
          {showForecast ? "현재 날씨 보기" : "주간 날씨 보기"}
        </button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "즐겨찾기 닫기" : "즐겨찾기 보기"}
        </button>
      </div>

      {showFavorites && (
        <div className="favorites">
          <h3>즐겨찾는 도시</h3>
          {favorites.length === 0 ? (
            <p className="no-favorites">즐겨찾기한 도시가 없습니다.</p>
          ) : (
            favorites.map((fav) => (
              <div key={fav} className="favorite-item">
                <button onClick={() => setCity(fav)}>{fav}</button>
                <button onClick={() => removeFromFavorites(fav)}>❌</button>
              </div>
            ))
          )}
        </div>
      )}

      {loading ? (
        <p>날씨 정보를 불러오는 중...</p>
      ) : errorMsg ? (
        <p className="error">{errorMsg}</p>
      ) : weatherData && !showForecast ? (
        <div className="weather-box">
          <h2>{weatherData.city} 날씨</h2>
          <p>날씨: {weatherData.desc}</p>
          <div className="weather-detail">
            <p>현재 온도: {weatherData.temp}°C</p>
            <p>체감 온도: {weatherData.feels_like}°C</p>
            <p>습도: {weatherData.humidity}%</p>
            <p>풍속: {weatherData.wind} m/s</p>
          </div>
          <p>{getRecommendation(weatherData.main)}</p>
          <img
            className="weather-icon"
            src={weatherData.icon}
            alt="날씨 아이콘"
          />
          <div className="buttons">
            {" "}
            <button
              onClick={addToFavorites}
              disabled={
                !weatherData.city || favorites.includes(weatherData.city)
              }
            >
              즐겨찾기 추가
            </button>
            <button onClick={handleSpeak}>🔊 정보 안내</button>
          </div>
        </div>
      ) : null}

      {showForecast && forecastData.length > 0 && (
        <div className="forecast">
          <div className="forecast-container">
            {forecastData.map((item) => (
              <div key={item.dt} className="forecast-item">
                <p>
                  {new Date(item.dt_txt).toLocaleDateString("ko-KR", {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
                <img
                  className="weather-icon"
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="예보 아이콘"
                />
                <p>{item.main.temp}°C</p>
                <p>{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
