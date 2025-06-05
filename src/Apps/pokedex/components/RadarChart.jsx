import React from "react";
import { Radar } from "react-chartjs-2";
import { statNameMap } from "../utils/constants";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ stats }) => {
  return (
    <div className="radar-chart-container">
      <Radar
        data={{
          labels: stats.map((s) => statNameMap[s.name] || s.name),
          datasets: [
            {
              label: "스탯",
              data: stats.map((s) => s.value),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            r: {
              min: 0,
              max: 255,
              ticks: { stepSize: 50, backdropColor: "transparent" },
              pointLabels: { font: { size: 14 }, color: "#333" },
              grid: { circular: true },
            },
          },
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
};

export default RadarChart;
