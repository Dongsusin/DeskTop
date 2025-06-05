import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemonList, onSelect }) => {
  return (
    <ul className="pokemon-list">
      {pokemonList.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={() => onSelect(p)} />
      ))}
    </ul>
  );
};

export default PokemonList;
