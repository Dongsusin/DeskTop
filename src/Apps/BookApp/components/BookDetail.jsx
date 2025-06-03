import React from "react";

export default function BookDetail({ book, onClose }) {
  const info = book.volumeInfo;

  return (
    <div className="book-detail">
      <button onClick={onClose}>닫기</button>
      <h2>{info.title}</h2>
      {info.authors && <p>저자: {info.authors.join(", ")}</p>}
      {info.publisher && <p>출판사: {info.publisher}</p>}
      {info.publishedDate && <p>출판일: {info.publishedDate}</p>}
      {info.description && (
        <p dangerouslySetInnerHTML={{ __html: info.description }} />
      )}
      <a href={info.infoLink} target="_blank" rel="noreferrer">
        구글 도서에서 자세히 보기 →
      </a>
    </div>
  );
}
