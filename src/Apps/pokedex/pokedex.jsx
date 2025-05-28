import React, { useEffect, useState } from "react";
import "./pokedex.css";

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

function PokedexApp() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [abilityModal, setAbilityModal] = useState(null);
  const limit = 30;

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      const offset = (page - 1) * limit;

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

            const abilities = await Promise.all(
              detail.abilities.map(async (ab) => {
                const resAb = await fetch(ab.ability.url);
                const abData = await resAb.json();
                const koName =
                  abData.names.find((n) => n.language.name === "ko")?.name ||
                  ab.ability.name;
                const koEffect =
                  abData.effect_entries.find((e) => e.language.name === "ko")
                    ?.effect || "설명 없음";

                return { name: koName, effect: koEffect };
              })
            );

            return {
              id: detail.id,
              name: koreanName,
              image: detail.sprites.front_default,
              types: detail.types.map((t) => typeKoMap[t.type.name]),
              stats: detail.stats.map((s) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
              abilities: abilities,
            };
          })
        );

        setPokemonList(detailedData);
      } catch (err) {
        console.error("포켓몬 데이터를 불러오는 중 오류:", err);
      }

      setLoading(false);
    };

    fetchPokemonList();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleDetailPrev = () => {
    if (!selectedPokemon) return;
    const currentIndex = pokemonList.findIndex(
      (p) => p.id === selectedPokemon.id
    );
    if (currentIndex > 0) setSelectedPokemon(pokemonList[currentIndex - 1]);
  };

  const handleDetailNext = () => {
    if (!selectedPokemon) return;
    const currentIndex = pokemonList.findIndex(
      (p) => p.id === selectedPokemon.id
    );
    if (currentIndex < pokemonList.length - 1)
      setSelectedPokemon(pokemonList[currentIndex + 1]);
  };

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">포켓몬 도감</h1>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div
          className="pokemon-grid"
          style={{ display: selectedPokemon ? "none" : "grid" }}
        >
          {pokemonList.map((pokemon) => (
            <div
              className="pokemon-card"
              key={pokemon.id}
              onClick={() => setSelectedPokemon(pokemon)}
            >
              <img
                className="pokemon-image"
                src={pokemon.image}
                alt={pokemon.name}
              />
              <p className="pokemon-name">{pokemon.name}</p>
              <div>
                {pokemon.types.map((type, i) => (
                  <span
                    key={i}
                    className="type-badge"
                    style={{ backgroundColor: typeColorMap[type] }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPokemon && (
        <div className="pokemon-detail-popup">
          <div className="detail-header">
            <button
              className="close-button"
              onClick={() => setSelectedPokemon(null)}
            >
              닫기
            </button>

            <img
              className="detail-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${selectedPokemon.id}.gif`}
              alt={selectedPokemon.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = selectedPokemon.image;
              }}
            />

            <h2>{selectedPokemon.name}</h2>

            <div>
              {selectedPokemon.types.map((type, i) => (
                <span
                  key={i}
                  className="type-badge"
                  style={{ backgroundColor: typeColorMap[type] }}
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="pokemon-abilities">
              <strong>특성:</strong>
              <ul className="ability-list">
                {selectedPokemon.abilities.map((ability, i) => (
                  <li key={i}>
                    <button
                      className="ability-btn"
                      onClick={() => setAbilityModal(ability)}
                    >
                      {ability.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pokemon-stats">
            <strong>능력치:</strong>
            <div className="stats-bar">
              {selectedPokemon.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-name">{stat.name}</div>
                  <div className="bar-background">
                    <div
                      className="bar-fill"
                      style={{ width: `${stat.value / 2}%` }}
                    >
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-pagination">
            <button
              onClick={handleDetailPrev}
              disabled={
                pokemonList.findIndex((p) => p.id === selectedPokemon.id) === 0
              }
            >
              이전 포켓몬
            </button>
            <button
              onClick={handleDetailNext}
              disabled={
                pokemonList.findIndex((p) => p.id === selectedPokemon.id) ===
                pokemonList.length - 1
              }
            >
              다음 포켓몬
            </button>
          </div>
        </div>
      )}

      {abilityModal && (
        <div className="modal-overlay" onClick={() => setAbilityModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{abilityModal.name}</h3>
            <p>{abilityModal.effect}</p>
            <button onClick={() => setAbilityModal(null)}>닫기</button>
          </div>
        </div>
      )}

      {!selectedPokemon && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={page === 1}>
            이전
          </button>
          <span>페이지 {page}</span>
          <button onClick={handleNext}>다음</button>
        </div>
      )}
    </div>
  );
}

export default PokedexApp;
