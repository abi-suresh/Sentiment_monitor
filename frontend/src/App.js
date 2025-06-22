import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css";

function App() {
  // State variables
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Analyze tweets on button click
  const handleAnalyze = async () => {
    if (!query.trim()) {
      setError("Please enter a topic to analyze.");
      return;
    }
    setError("");
    setLoading(true);
    setResults([]);
    setSummary("");

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.results || []);
        setSummary(data.summary || "");
      }
    } catch (err) {
      setError("Failed to fetch data from server.");
    } finally {
      setLoading(false);
    }
  };

  // Download CSV of results
  const handleDownload = async () => {
    if (results.length === 0) {
      alert("No data to download.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tweets.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Failed to download CSV.");
    }
  };

  // Calculate sentiment counts for pie chart
  const sentiments = results.reduce(
    (acc, r) => {
      acc[r.sentiment] = (acc[r.sentiment] || 0) + 1;
      return acc;
    },
    { Positive: 0, Negative: 0, Neutral: 0 }
  );

  // Data for pie chart
  const pieData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [sentiments.Positive, sentiments.Negative, sentiments.Neutral],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
        hoverOffset: 15,
      },
    ],
  };

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <header className="header">
        <h1>🧠 Social Media Sentiment Monitor</h1>
        <div className="dark-mode-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            />
            <span className="slider round"></span>
          </label>
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </header>

      <main className="main-content">
        <section className="input-section">
          <input
            type="text"
            placeholder="Enter a topic (e.g. AI, Football)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAnalyze();
            }}
            aria-label="Search topic"
          />
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Tweets"}
          </button>
        </section>

        {error && <p className="error-message">{error}</p>}

        {summary && (
          <section className="summary-section" aria-live="polite">
            <h2>📝 Tweet Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {results.length > 0 && (
          <>
            <section className="chart-section" aria-label="Sentiment distribution chart">
              <h2>📊 Sentiment Distribution</h2>
              <Pie data={pieData} />
            </section>

            <button className="download-btn" onClick={handleDownload}>
              ⬇️ Download CSV
            </button>

            <section className="results-section" aria-label="Tweet analysis results">
              <h2>📬 Tweet Results</h2>
              <table>
                <thead>
                  <tr>
                    <th>Tweet</th>
                    <th>Sentiment</th>
                    <th>Score</th>
                    <th>Emojis</th>
                    <th>Hashtags</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td>{r.text}</td>
                      <td>{r.sentiment}</td>
                      <td>
                        {typeof r.score === "number"
                          ? r.score.toFixed(2)
                          : "—"}
                      </td>
                      <td>{r.emojis || "—"}</td>
                      <td>{r.hashtags || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
