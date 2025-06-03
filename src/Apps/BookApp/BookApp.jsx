import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecentSearches from "./components/RecentSearches";
import SortBar from "./components/SortBar";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import Pagination from "./components/Pagination";
import FavoritesList from "./components/FavoritesList";
import "./BookApp.css";

export default function BookApp() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const maxResults = 12;

  useEffect(() => {
    if (query.trim() === "") return;
    fetchBooks(query, page);
  }, [page, sort]);

  const fetchBooks = async (search, pageNum = 0) => {
    setLoading(true);
    setError("");
    const startIndex = pageNum * maxResults;
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          search
        )}&orderBy=${sort}&maxResults=${maxResults}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
        setBooks([]);
        setTotalItems(0);
      } else {
        setBooks(data.items || []);
        setTotalItems(data.totalItems || 0);
        if (pageNum === 0) addRecentSearch(search);
      }
    } catch (e) {
      setError("검색 중 오류가 발생했습니다.");
      setBooks([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const addRecentSearch = (term) => {
    setRecentSearches((prev) =>
      [term, ...prev.filter((t) => t !== term)].slice(0, 5)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    setPage(0);
    fetchBooks(query, 0);
  };

  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      return exists ? prev.filter((b) => b.id !== book.id) : [...prev, book];
    });
  };

  const totalPages = Math.ceil(totalItems / maxResults);

  return (
    <div className="book-app">
      {!selectedBook ? (
        <>
          <h1>도서 검색</h1>
          <SearchBar
            query={query}
            onChange={(e) => setQuery(e.target.value)}
            onSubmit={handleSubmit}
          />
          <RecentSearches
            recentSearches={recentSearches}
            onClick={(term) => {
              setQuery(term);
              setPage(0);
              fetchBooks(term, 0);
            }}
          />
          <SortBar
            sort={sort}
            onChange={(val) => {
              setSort(val);
              setPage(0);
            }}
          />
          {loading && <div className="loader">로딩 중...</div>}
          {error && <div className="error">{error}</div>}
          <BookList
            books={books}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onSelect={setSelectedBook}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
          <FavoritesList
            favorites={favorites}
            onRemove={(id) =>
              setFavorites((prev) => prev.filter((b) => b.id !== id))
            }
          />
        </>
      ) : (
        <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
