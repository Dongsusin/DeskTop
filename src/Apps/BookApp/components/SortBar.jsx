import React from "react";

export default function SortBar({ sort, onChange }) {
  return (
    <div className="sort-bar">
      정렬:{" "}
      <select value={sort} onChange={(e) => onChange(e.target.value)}>
        <option value="relevance">관련도</option>
        <option value="newest">최신순</option>
      </select>
    </div>
  );
}
