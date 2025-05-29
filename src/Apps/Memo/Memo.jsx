import { useState, useEffect, useRef } from "react";
import "./Memo.css";

const LOCAL_STORAGE_KEY = "my-notes-simple";

function Memo() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("list"); // 'list' or 'edit'
  const saveTimeout = useRef(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // 목록에서 메모 선택 시 편집 모드로 전환
  function handleSelectNote(id) {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setCurrentNoteId(id);
      setInput(note.content);
      setMode("edit");
    }
  }

  // 새 메모 추가 -> 편집 모드로 전환
  function handleAddNote() {
    setCurrentNoteId(null);
    setInput("");
    setMode("edit");
  }

  // 저장 (작성모드에서만 사용)
  function handleSave() {
    if (currentNoteId === null) {
      // 새 메모 저장
      const newNote = {
        id: Date.now().toString(),
        content: input,
        updatedAt: Date.now(),
      };
      setNotes([newNote, ...notes]);
      setCurrentNoteId(newNote.id);
    } else {
      // 기존 메모 업데이트
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currentNoteId
            ? { ...note, content: input, updatedAt: Date.now() }
            : note
        )
      );
    }
    setMode("list");
  }

  // 편집 중인 텍스트 변경
  function handleInputChange(e) {
    setInput(e.target.value);
  }

  // 편집 취소 (목록으로 돌아가기)
  function handleCancel() {
    setMode("list");
  }

  // 메모 삭제 (목록 모드에서만)
  function handleDelete(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (id === currentNoteId) {
      setCurrentNoteId(null);
      setInput("");
    }
  }

  // 목록 모드 UI
  if (mode === "list") {
    return (
      <div className="memo-app">
        <div className="memo-sidebar">
          <button onClick={handleAddNote} className="add-note-btn">
            메모 작성
          </button>
          <ul className="note-list">
            {notes.map((note) => (
              <li key={note.id} className="note-list-item">
                <div
                  onClick={() => handleSelectNote(note.id)}
                  className="note-title"
                >
                  {note.content.slice(0, 20) || "빈 메모"}
                </div>
                <button
                  className="delete-note-btn"
                  onClick={() => handleDelete(note.id)}
                  title="삭제"
                >
                  ×
                </button>
              </li>
            ))}
            {notes.length === 0 && <li>저장된 메모가 없습니다.</li>}
          </ul>
        </div>
      </div>
    );
  }

  // 편집 모드 UI
  return (
    <div className="memo-app">
      <div className="memo-edit">
        <textarea
          className="memo-input"
          value={input}
          onChange={handleInputChange}
          placeholder="메모를 입력하세요..."
          autoFocus
        />
        <div className="memo-footer">
          <span>글자 수: {input.length}</span>
          <div>
            <button onClick={handleCancel}>취소</button>
            <button onClick={handleSave} disabled={input.trim() === ""}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Memo;
