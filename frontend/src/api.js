const API_URL = 'http://localhost:5000';

export const analyzeTweets = async (query, count, lang) => {
  const res = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, count, lang }),
  });
  return await res.json();
};

export const getSummary = async (tweets) => {
  const res = await fetch(`${API_URL}/summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tweets }),
  });
  return await res.json();
};
export const downloadCSV = async (results) => {
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
};
