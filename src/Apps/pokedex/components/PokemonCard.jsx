import React from "react";
import { typeColorMap, getTypeGradient } from "../utils/constants";

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <li
      className="pokemon-item"
      onClick={onClick}
      style={{
        background: getTypeGradient(pokemon.types),
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
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
    </li>
  );
};

export default PokemonCard;
