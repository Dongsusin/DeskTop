import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
      <button
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        이전
      </button>
      <span style={{ margin: "0 10px", color: "white" }}>
        {page + 1} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page + 1 >= totalPages}
      >
        다음
      </button>
    </div>
  );
}
