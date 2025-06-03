import React from "react";
import BookCard from "./BookCard";

export default function BookList({
  books,
  favorites,
  toggleFavorite,
  onSelect,
}) {
  return (
    <div className="book-list">
      {books.map((book, i) => (
        <BookCard
          key={book.id || i}
          book={book}
          isFavorite={favorites.some((b) => b.id === book.id)}
          toggleFavorite={toggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
