import React from "react";

const EvolutionChain = ({ evolutionChain, onSelect }) => {
  return (
    <div className="evolution-chain">
      <h3>진화 정보</h3>
      <div className="evolution-list">
        {evolutionChain.map((p) => (
          <div
            key={p.id}
            className="evolution-item"
            onClick={() => onSelect(p.id)}
          >
            <img src={p.image} alt={p.name} />
            <div>{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
