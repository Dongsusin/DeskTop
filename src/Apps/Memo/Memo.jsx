import { useState, useEffect } from "react";
import "./Memo.css";

const LOCAL_STORAGE_KEY = "my-notes-simple";

function Memo() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedNote) {
      setInput(savedNote);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, input);
  }, [input]);

  return (
    <div className="memo-app">
      <textarea
        className="memo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메모를 입력하세요..."
      />
    </div>
  );
}

export default Memo;
