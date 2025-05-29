import React, { useState, useEffect } from "react";

export default function BookApp() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0); // 0부터 시작
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const maxResults = 12;

  useEffect(() => {
    if (query.trim() === "") return;

    fetchBooks(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (pageNum === 0) {
          addRecentSearch(search);
        }
      }
    } catch (e) {
      setError("검색 중 오류가 발생했습니다.");
      setBooks([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const addRecentSearch = (searchTerm) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== searchTerm);
      return [searchTerm, ...filtered].slice(0, 5);
    });
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
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  // 총 페이지수 계산
  const totalPages = Math.ceil(totalItems / maxResults);

  return (
    <div className="book-app">
      {!selectedBook && (
        <>
          <h1>도서 검색</h1>

          {/* 검색 바 */}
          <form onSubmit={handleSubmit} className="search-bar">
            <input
              type="text"
              placeholder="도서 이름 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">검색</button>
          </form>

          {/* 최근 검색어 */}
          {recentSearches.length > 0 && (
            <div className="recent-searches">
              최근 검색어:{" "}
              {recentSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(term);
                    setPage(0);
                    fetchBooks(term, 0);
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          )}

          {/* 정렬 */}
          <div className="sort-bar">
            정렬:{" "}
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(0);
              }}
            >
              <option value="relevance">관련도</option>
              <option value="newest">최신순</option>
            </select>
          </div>

          {/* 로딩 */}
          {loading && <div className="loader">로딩 중...</div>}

          {/* 에러 */}
          {error && <div className="error">{error}</div>}

          {/* 도서 리스트 */}
          <div className="book-list">
            {books.map((book, i) => {
              const info = book.volumeInfo;
              const isFavorite = favorites.some((b) => b.id === book.id);
              return (
                <div
                  key={book.id || i}
                  className="book-card"
                  onClick={() => setSelectedBook(book)}
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
            })}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
              >
                이전
              </button>
              <span style={{ margin: "0 10px" }}>
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page + 1 >= totalPages}
              >
                다음
              </button>
            </div>
          )}

          {/* 찜 목록 */}
          {favorites.length > 0 && (
            <div className="favorites">
              <h2>즐겨찾기 목록</h2>
              <ul>
                {favorites.map((book) => (
                  <li key={book.id}>
                    {book.volumeInfo.title}{" "}
                    <button
                      onClick={() =>
                        setFavorites((prev) =>
                          prev.filter((b) => b.id !== book.id)
                        )
                      }
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* 상세 페이지 */}
      {selectedBook && (
        <div className="book-detail">
          <button onClick={() => setSelectedBook(null)}>닫기</button>
          <h2>{selectedBook.volumeInfo.title}</h2>
          {selectedBook.volumeInfo.authors && (
            <p>저자: {selectedBook.volumeInfo.authors.join(", ")}</p>
          )}
          {selectedBook.volumeInfo.publisher && (
            <p>출판사: {selectedBook.volumeInfo.publisher}</p>
          )}
          {selectedBook.volumeInfo.publishedDate && (
            <p>출판일: {selectedBook.volumeInfo.publishedDate}</p>
          )}
          {selectedBook.volumeInfo.description && (
            <p
              dangerouslySetInnerHTML={{
                __html: selectedBook.volumeInfo.description,
              }}
            />
          )}
          <a
            href={selectedBook.volumeInfo.infoLink}
            target="_blank"
            rel="noreferrer"
          >
            구글 도서에서 자세히 보기 →
          </a>
        </div>
      )}
    </div>
  );
}
