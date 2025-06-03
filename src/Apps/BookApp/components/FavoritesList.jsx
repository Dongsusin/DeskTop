import React from "react";

export default function FavoritesList({ favorites, onRemove }) {
  if (favorites.length === 0) return null;

  return (
    <div className="favorites">
      <h2>즐겨찾기 목록</h2>
      <ul>
        {favorites.map((book) => (
          <li key={book.id}>
            {book.volumeInfo.title}{" "}
            <button onClick={() => onRemove(book.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
