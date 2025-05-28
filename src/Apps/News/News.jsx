import React, { useEffect, useState } from "react";
import "./News.css";

const API_KEY = "99897f6c131740a9abd4600f8ee5a385";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("technology");

  const fetchNews = async (searchTerm) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=10&apiKey=${API_KEY}`
    );
    const data = await res.json();
    setArticles(data.articles || []);
  };

  useEffect(() => {
    fetchNews(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  return (
    <div className="News">
      <h1>뉴스</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      <div className="news-list">
        {articles.map((article, i) => (
          <div className="news-card" key={i}>
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} />
            )}
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noreferrer">
                더보기 →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
