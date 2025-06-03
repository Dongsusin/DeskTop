import React from "react";

export default function BookCard({
  book,
  isFavorite,
  toggleFavorite,
  onSelect,
}) {
  const info = book.volumeInfo;

  return (
    <div
      className="book-card"
      onClick={() => onSelect(book)}
      style={{ cursor: "pointer" }}
      title="상세보기"
    >
      {info.imageLinks?.thumbnail && (
        <img src={info.imageLinks.thumbnail} alt={info.title} />
      )}
      <div className="book-content">
        <h3>{info.title}</h3>
        <p>{info.authors?.join(", ")}</p>
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(book);
            }}
          >
            {isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
        </div>
      </div>
    </div>
  );
}
