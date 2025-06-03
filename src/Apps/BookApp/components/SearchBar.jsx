import React from "react";

export default function SearchBar({ query, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="search-bar">
      <input
        type="text"
        placeholder="도서 이름 검색"
        value={query}
        onChange={onChange}
      />
      <button type="submit">검색</button>
    </form>
  );
}
