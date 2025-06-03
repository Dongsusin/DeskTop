import React from "react";

export default function RecentSearches({ recentSearches, onClick }) {
  if (recentSearches.length === 0) return null;

  return (
    <div className="recent-searches">
      최근 검색어:{" "}
      {recentSearches.map((term, i) => (
        <button key={i} onClick={() => onClick(term)}>
          {term}
        </button>
      ))}
    </div>
  );
}
