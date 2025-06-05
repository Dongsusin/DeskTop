import React, { useEffect, useState } from "react";
import StatBar from "./StatBar";
import RadarChart from "./RadarChart";
import EvolutionChain from "./EvolutionChain";
import { typeColorMap } from "../utils/constants";

const PokemonModal = ({
  pokemon,
  onClose,
  onFavorite,
  favorites,
  onNavigate,
}) => {
  const [statView, setStatView] = useState("bar");
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    setStatView("bar");
    setEvolutionChain(null);
  }, [pokemon]);

  const fetchEvolutionChain = async (id) => {
    try {
      const resSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const species = await resSpecies.json();
      const evoRes = await fetch(species.evolution_chain.url);
      const evoData = await evoRes.json();

      const chain = [];
      let current = evoData.chain;
      while (current) {
        const name = current.species.name;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const detail = await res.json();
        const korName =
          species.names.find((n) => n.language.name === "ko")?.name || name;
        const image = detail.sprites.front_default;
        chain.push({ id: detail.id, name: korName, image });
        current = current.evolves_to[0];
      }

      setEvolutionChain(chain);
    } catch {}
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          ×
        </button>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.image} alt={pokemon.name} />
        <div className="types">
          {pokemon.types.map((t) => (
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
            {pokemon.stats.map((s) => (
              <StatBar key={s.name} stat={s} />
            ))}
          </div>
        )}

        {statView === "radar" && <RadarChart stats={pokemon.stats} />}

        {statView === "evolution" && evolutionChain && (
          <EvolutionChain
            evolutionChain={evolutionChain}
            onSelect={(id) => onNavigate("custom", id)}
          />
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
          <button
            onClick={() => {
              if (statView !== "evolution") fetchEvolutionChain(pokemon.id);
              setStatView("evolution");
            }}
            className={statView === "evolution" ? "active" : ""}
          >
            진화
          </button>
        </div>

        <button onClick={() => onFavorite(pokemon)}>
          {favorites.some((p) => p.id === pokemon.id)
            ? "즐겨찾기 해제"
            : "즐겨찾기 추가"}
        </button>

        <div className="detail-nav">
          <button onClick={() => onNavigate("prev")} disabled={pokemon.id <= 1}>
            이전 포켓몬
          </button>
          <button onClick={() => onNavigate("next")}>다음 포켓몬</button>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
