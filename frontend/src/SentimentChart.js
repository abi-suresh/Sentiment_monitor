// src/SentimentChart.js
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export function SentimentPieChart({ results }) {
  const sentimentCounts = { Positive: 0, Neutral: 0, Negative: 0 };

  results.forEach((r) => {
    sentimentCounts[r.sentiment]++;
  });

  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [
          sentimentCounts["Positive"],
          sentimentCounts["Neutral"],
          sentimentCounts["Negative"],
        ],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div>
      <h3>🟢 Sentiment Distribution</h3>
      <Pie data={data} />
    </div>
  );
}

export function SentimentBarChart({ results }) {
  const labels = results.map((_, i) => `Tweet ${i + 1}`);
  const scores = results.map((r) => r.score);

  const data = {
    labels,
    datasets: [
      {
        label: "Sentiment Score",
        data: scores,
        backgroundColor: scores.map((s) =>
          s > 0 ? "#28a745" : s < 0 ? "#dc3545" : "#ffc107"
        ),
      },
    ],
  };

  return (
    <div>
      <h3>📊 Sentiment Scores</h3>
      <Bar data={data} />
    </div>
  );
}
