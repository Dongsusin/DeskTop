import React from "react";

const Header = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  typeFilter,
  onTypeChange,
  typeOptions,
}) => {
  return (
    <header>
      <h1>포켓몬 도감</h1>
      <input
        type="text"
        placeholder="포켓몬 이름 검색"
        value={searchTerm}
        onChange={onSearchTermChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <button onClick={onSearch}>검색</button>
      <select value={typeFilter} onChange={onTypeChange}>
        <option value="favorite">⭐ 즐겨찾기</option>
        <option value="">전체 타입</option>
        {typeOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </header>
  );
};

export default Header;
