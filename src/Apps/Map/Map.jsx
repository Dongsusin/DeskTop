import "./Map.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 커스텀 아이콘 설정
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png", // 예시 커스텀 아이콘
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [14, 41],
});

function Map() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setError(null); // 초기화
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setCoords({ lat, lon });
      },
      (err) => {
        setError("위치 접근 실패: " + err.message);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="map-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={getCurrentLocation} style={{ marginBottom: "10px" }}>
        위치 업데이트
      </button>
      {coords ? (
        <MapContainer
          center={[coords.lat, coords.lon]}
          zoom={15}
          scrollWheelZoom={false}
          className="map"
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords.lat, coords.lon]} icon={customIcon}>
            <Popup>현재 위치</Popup>
          </Marker>
          {/* 반경 500m 원 표시 */}
          <Circle
            center={[coords.lat, coords.lon]}
            radius={500}
            pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.2 }}
          />
        </MapContainer>
      ) : (
        <p>현재 위치를 가져오는 중입니다...</p>
      )}
    </div>
  );
}

export default Map;
