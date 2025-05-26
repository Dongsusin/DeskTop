import React, { useEffect, useState } from "react";
import "./Movies.css";

const API_KEY = "86b123ef6a73237705eb7320077ff2eb";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="popular-movies">
      <h2>인기 영화</h2>
      {loading && <p>로딩중...</p>}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
            />
            <div className="movie-info">
              <p className="title">{movie.title}</p>
              <p className="rating">⭐ {movie.vote_average}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          이전 페이지
        </button>
        <span>페이지 {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>다음 페이지</button>
      </div>
    </div>
  );
}
