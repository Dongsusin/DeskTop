import React, { useEffect, useState } from "react";
import "./pokedex.css";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const typeKoMap = {
  normal: "노말",
  fire: "불꽃",
  water: "물",
  electric: "전기",
  grass: "풀",
  ice: "얼음",
  fighting: "격투",
  poison: "독",
  ground: "땅",
  flying: "비행",
  psychic: "에스퍼",
  bug: "벌레",
  rock: "바위",
  ghost: "고스트",
  dragon: "드래곤",
  dark: "악",
  steel: "강철",
  fairy: "페어리",
};

const typeColorMap = {
  노말: "#A8A878",
  불꽃: "#F08030",
  물: "#6890F0",
  전기: "#F8D030",
  풀: "#78C850",
  얼음: "#98D8D8",
  격투: "#C03028",
  독: "#A040A0",
  땅: "#E0C068",
  비행: "#A890F0",
  에스퍼: "#F85888",
  벌레: "#A8B820",
  바위: "#B8A038",
  고스트: "#705898",
  드래곤: "#7038F8",
  악: "#705848",
  강철: "#B8B8D0",
  페어리: "#EE99AC",
};

const statNameMap = {
  hp: "체력",
  attack: "공격",
  defense: "방어",
  "special-attack": "특공",
  "special-defense": "특방",
  speed: "스피드",
};

function PokedexApp() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [recent, setRecent] = useState(() =>
    JSON.parse(localStorage.getItem("recent") || "[]")
  );
  const limit = 30;
  const [typeFilteredAll, setTypeFilteredAll] = useState([]);
  const [statView, setStatView] = useState("bar"); // 'bar' or 'radar'

  const getPokemonImage = async (id, fallbackUrl) => {
    const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

    try {
      const res = await fetch(gifUrl, { method: "HEAD" });
      if (res.ok) {
        return gifUrl;
      }
    } catch (e) {}

    return fallbackUrl;
  };

  const getTypeGradient = (types) => {
    if (!types || types.length === 0) return "#ccc";
    const colors = types.map((t) => typeColorMap[t]);
    if (colors.length === 1) return colors[0];
    return `linear-gradient(135deg, ${colors.join(", ")})`;
  };

  const fetchPokemonList = async (pageNum) => {
    setLoading(true);
    const offset = (pageNum - 1) * limit;

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();

      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const resDetail = await fetch(pokemon.url);
          const detail = await resDetail.json();

          const resSpecies = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${detail.id}/`
          );
          const species = await resSpecies.json();
          const koreanName =
            species.names.find((n) => n.language.name === "ko")?.name ||
            detail.name;

          const image = await getPokemonImage(
            detail.id,
            detail.sprites.front_default
          );

          return {
            id: detail.id,
            name: koreanName,
            image,
            types: detail.types.map((t) => typeKoMap[t.type.name]),
            stats: detail.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            })),
          };
        })
      );

      setPokemonList(detailedData);
    } catch (err) {
      alert("포켓몬 데이터를 불러오는 중 오류가 발생했습니다.");
      setPokemonList([]);
    }

    setLoading(false);
  };

  const fetchTypeFilteredList = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/type/${type.toLowerCase()}`
      );
      if (!res.ok) throw new Error("타입 데이터를 불러올 수 없습니다.");
      const data = await res.json();
      const allTypePokemons = data.pokemon.map((p) => p.pokemon);
      setTypeFilteredAll(allTypePokemons);
    } catch (err) {
      alert("타입 필터 데이터를 불러오는 중 오류가 발생했습니다.");
      setTypeFilteredAll([]);
    }
    setLoading(false);
  };

  const fetchFilteredPageDetails = async (pageNum) => {
    setLoading(true);
    const offset = (pageNum - 1) * limit;
    const pagePokemons = typeFilteredAll.slice(offset, offset + limit);

    try {
      const detailedData = await Promise.all(
        pagePokemons.map(async (p) => {
          const resDetail = await fetch(p.url);
          const detail = await resDetail.json();

          const resSpecies = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${detail.id}/`
          );
          const species = await resSpecies.json();
          const koreanName =
            species.names.find((n) => n.language.name === "ko")?.name ||
            detail.name;

          const image = await getPokemonImage(
            detail.id,
            detail.sprites.front_default
          );

          return {
            id: detail.id,
            name: koreanName,
            image,
            types: detail.types.map((t) => typeKoMap[t.type.name]),
            stats: detail.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            })),
          };
        })
      );

      setPokemonList(detailedData);
    } catch {
      alert("포켓몬 상세 데이터를 불러오는 중 오류가 발생했습니다.");
      setPokemonList([]);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      if (!res.ok) {
        alert("포켓몬을 찾을 수 없습니다.");
        return;
      }

      const detail = await res.json();
      const resSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${detail.id}/`
      );
      const species = await resSpecies.json();
      const koreanName =
        species.names.find((n) => n.language.name === "ko")?.name ||
        detail.name;
      const image = await getPokemonImage(
        detail.id,
        detail.sprites.front_default
      );
      const result = {
        id: detail.id,
        name: koreanName,
        image,
        types: detail.types.map((t) => typeKoMap[t.type.name]),
        stats: detail.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      };

      setSelectedPokemon(result);
      setRecent((prev) =>
        [result, ...prev.filter((p) => p.id !== result.id)].slice(0, 5)
      );
    } catch {
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const loadPokemonById = async (id) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) return null;
      const detail = await res.json();

      const resSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const species = await resSpecies.json();
      const koreanName =
        species.names.find((n) => n.language.name === "ko")?.name ||
        detail.name;

      const image = await getPokemonImage(
        detail.id,
        detail.sprites.front_default
      );

      return {
        id: detail.id,
        name: koreanName,
        image,
        types: detail.types.map((t) => typeKoMap[t.type.name]),
        stats: detail.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      };
    } catch {
      return null;
    }
  };

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  const handleDetailPrev = async () => {
    if (!selectedPokemon || selectedPokemon.id <= 1) return;
    const prevId = selectedPokemon.id - 1;
    const pokemon = await loadPokemonById(prevId);
    if (pokemon) setSelectedPokemon(pokemon);
  };

  const handleDetailNext = async () => {
    if (!selectedPokemon) return;
    const nextId = selectedPokemon.id + 1;
    const pokemon = await loadPokemonById(nextId);
    if (pokemon) setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    if (typeFilter === "favorite") {
      setPokemonList(favorites);
    } else if (typeFilter) {
      fetchTypeFilteredList(
        Object.keys(typeKoMap).find((key) => typeKoMap[key] === typeFilter)
      );
    } else {
      setTypeFilteredAll([]);
      setPage(1);
      fetchPokemonList(1);
    }
  }, [typeFilter, favorites]);

  useEffect(() => {
    if (typeFilter && typeFilter !== "favorite" && typeFilteredAll.length > 0) {
      setPage(1);
      fetchFilteredPageDetails(1);
    }
  }, [typeFilteredAll]);

  useEffect(() => {
    if (typeFilter === "favorite") {
      setPokemonList(favorites);
    } else if (typeFilter) {
      fetchFilteredPageDetails(page);
    } else {
      fetchPokemonList(page);
    }
  }, [page]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    fetchPokemonList(page);
  }, []);

  return (
    <div className="pokedex-container">
      <header>
        <h1>포켓몬 도감</h1>
        <input
          type="text"
          placeholder="포켓몬 이름 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>검색</button>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="favorite">⭐ 즐겨찾기</option>
          <option value="">전체 타입</option>
          {Object.values(typeKoMap).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </header>

      {loading && <div className="loading">로딩 중...</div>}

      {!selectedPokemon && (
        <main>
          <ul className="pokemon-list">
            {pokemonList.map((p) => (
              <li
                key={p.id}
                className="pokemon-item"
                onClick={() => setSelectedPokemon(p)}
                style={{
                  background: getTypeGradient(p.types),
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <div className="types">
                  {p.types.map((t) => (
                    <span
                      key={t}
                      className="type"
                      style={{ backgroundColor: typeColorMap[t] }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {typeFilter !== "favorite" && (
            <div className="pagination">
              <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                이전
              </button>
              <span>{page} 페이지</span>
              <button
                onClick={() =>
                  setPage((prev) =>
                    prev * limit < (typeFilter ? typeFilteredAll.length : 1118)
                      ? prev + 1
                      : prev
                  )
                }
              >
                다음
              </button>
            </div>
          )}
        </main>
      )}

      {selectedPokemon && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setSelectedPokemon(null)}>
              ×
            </button>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
            <div className="types">
              {selectedPokemon.types.map((t) => (
                <span
                  key={t}
                  className="type"
                  style={{ backgroundColor: typeColorMap[t] }}
                >
                  {t}
                </span>
              ))}
            </div>
            {statView === "bar" && (
              <div className="stats">
                {selectedPokemon.stats.map((s) => {
                  const value = s.value;
                  const ratio = (value / 255) * 100;

                  const getBarColor = (val) => {
                    if (val >= 180) return "#ff5959";
                    if (val >= 120) return "#f5ac78";
                    if (val >= 80) return "#fae078";
                    if (val >= 40) return "#9db7f5";
                    return "#a4a4a4";
                  };

                  return (
                    <div key={s.name} className="stat">
                      <span className="stat-name">
                        {statNameMap[s.name] || s.name}
                      </span>
                      <div className="stat-bar-wrapper">
                        <div
                          className="stat-bar"
                          style={{
                            width: `${ratio}%`,
                            backgroundColor: getBarColor(value),
                          }}
                        ></div>
                      </div>
                      <span className="stat-value">{value}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {statView === "radar" && (
              <div className="radar-chart-container">
                <Radar
                  data={{
                    labels: selectedPokemon.stats.map(
                      (s) => statNameMap[s.name] || s.name
                    ),
                    datasets: [
                      {
                        label: "스탯",
                        data: selectedPokemon.stats.map((s) => s.value),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        pointBackgroundColor: "rgba(255, 99, 132, 1)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      r: {
                        min: 0,
                        max: 255,
                        ticks: { stepSize: 50, backdropColor: "transparent" },
                        pointLabels: {
                          font: { size: 14 },
                          color: "#333",
                        },
                        grid: {
                          circular: true,
                        },
                      },
                    },
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>
            )}

            <div className="stat-toggle-buttons">
              <button
                onClick={() => setStatView("bar")}
                className={statView === "bar" ? "active" : ""}
              >
                기본
              </button>
              <button
                onClick={() => setStatView("radar")}
                className={statView === "radar" ? "active" : ""}
              >
                원형
              </button>
            </div>

            <button onClick={() => toggleFavorite(selectedPokemon)}>
              {favorites.some((p) => p.id === selectedPokemon.id)
                ? "즐겨찾기 해제"
                : "즐겨찾기 추가"}
            </button>
            <div className="detail-nav">
              <button
                onClick={handleDetailPrev}
                disabled={selectedPokemon.id <= 1}
              >
                이전 포켓몬
              </button>
              <button onClick={handleDetailNext}>다음 포켓몬</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokedexApp;
