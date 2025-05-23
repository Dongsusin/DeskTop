import { useEffect, useState } from "react";
import "./Weather.css";

const API_KEY = "e6d02aec03da2632c5505afa1f2670ec";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeatherData({
              temp: data.main.temp,
              desc: data.weather[0].description,
              icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            });
          })
          .catch((err) => console.log("날씨 불러오기 실패:", err));
      },
      () => console.log("위치 접근 실패")
    );
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }} className="weather">
      {weatherData ? (
        <>
          <h2>현재 온도: {weatherData.temp}°C</h2>
          <p>날씨: {weatherData.desc}</p>
          <img src={weatherData.icon} alt="날씨 아이콘" />
        </>
      ) : (
        <p>날씨 정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default Weather;
