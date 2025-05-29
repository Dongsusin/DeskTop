function MemoPopup({ selectedDate, memoInput, onChange, onSave, onClose }) {
  return (
    <div className="popup">
      <div className="popup-header">
        <span>{selectedDate} 메모</span>
        <div className="button-grup">
          <button onClick={onSave}>저장</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
      <div className="popup-content">
        <textarea
          value={memoInput}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
export default MemoPopup;
