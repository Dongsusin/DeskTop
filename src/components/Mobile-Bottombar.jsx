function MobileBottombar({ onCloseAll }) {
  return (
    <div className="mobile-bottombar">
      <div className="bottom-left">
        <button>☐</button>
      </div>
      <div className="bottom-center">
        <button>◯</button>
      </div>
      <div className="bottom-right">
        <button onClick={onCloseAll}>◁</button>
      </div>
    </div>
  );
}

export default MobileBottombar;
