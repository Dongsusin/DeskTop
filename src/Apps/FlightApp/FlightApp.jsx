import React, { useState, useEffect } from "react";
import "./FlightApp.css";

const API_URL = "https://opensky-network.org/api/states/all";

const FlightApp = () => {
  const [origin, setOrigin] = useState("ICN");
  const [destination, setDestination] = useState("NRT");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFlights = async () => {
    setLoading(true);
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
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="flight-container">
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

      {loading ? (
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
    </div>
  );
};

export default FlightApp;
