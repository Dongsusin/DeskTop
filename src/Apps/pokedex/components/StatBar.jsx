import React from "react";
import { statNameMap } from "../utils/constants";

const StatBar = ({ stat }) => {
  const value = stat.value;
  const ratio = (value / 255) * 100;

  const getBarColor = (val) => {
    if (val >= 180) return "#ff5959";
    if (val >= 120) return "#f5ac78";
    if (val >= 80) return "#fae078";
    if (val >= 40) return "#9db7f5";
    return "#a4a4a4";
  };

  return (
    <div className="stat">
      <span className="stat-name">{statNameMap[stat.name] || stat.name}</span>
      <div className="stat-bar-wrapper">
        <div
          className="stat-bar"
          style={{
            width: `${ratio}%`,
            backgroundColor: getBarColor(value),
          }}
        ></div>
      </div>
      <span className="stat-value">{value}</span>
    </div>
  );
};

export default StatBar;
