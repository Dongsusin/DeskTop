import React from "react";

const Keypad = ({ buttons, onClick }) => (
  <div className="buttons">
    {buttons.map((btn) => (
      <button key={btn} onClick={() => onClick(btn)} className={`btn ${btn}`}>
        {btn}
      </button>
    ))}
  </div>
);

export default Keypad;
