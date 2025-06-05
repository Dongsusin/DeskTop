import React from "react";

const Pagination = ({ page, onPageChange, total, limit }) => {
  const maxPage = Math.ceil(total / limit);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page <= 1}
      >
        이전
      </button>
      <span>{page} 페이지</span>
      <button
        onClick={() => onPageChange(page < maxPage ? page + 1 : page)}
        disabled={page >= maxPage}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
