import React, { useState } from "react";
import "./BookApp.css";

export default function BookApp() {
  const [query, setQuery] = useState("javascript");
  const [books, setBooks] = useState([]);

  const fetchBooks = async (search) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10`
    );
    const data = await res.json();
    setBooks(data.items || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  return (
    <div className="book">
      <h1>도서 검색</h1>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="책 제목 또는 키워드 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      <div className="book-list">
        {books.map((book, i) => {
          const info = book.volumeInfo;
          return (
            <div className="book-card" key={i}>
              {info.imageLinks?.thumbnail && (
                <img src={info.imageLinks.thumbnail} alt={info.title} />
              )}
              <div className="book-content">
                <h3>{info.title}</h3>
                <p>{info.authors?.join(", ")}</p>
                <a href={info.infoLink} target="_blank" rel="noreferrer">
                  더보기 →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
