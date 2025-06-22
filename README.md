# 🧠 Social Media Sentiment Monitor

An AI-powered full-stack web application that analyzes **live tweets** based on user-provided topics using NLP. It provides **real-time sentiment analysis**, **emoji & hashtag extraction**, **summarization**, and **data visualizations**, with options to **export** results and switch between **light/dark modes**.
## 🚀 Features

- 🔍 **Live Tweet Analysis** – Fetch and analyze tweets for any topic.
- 📊 **Sentiment Detection** – Classify tweets into Positive, Negative, or Neutral.
- 😊 **Emoji & Hashtag Extraction** – Capture emotional and contextual cues.
- 📝 **Tweet Summarization** – Summarize tweets using AI for quick insights.
- 📁 **Download as CSV** – Export results for offline analysis.
- 📈 **Data Visualizations** – Pie and bar charts of sentiment distribution.
- 🌗 **Dark Mode Toggle** – Switch between light and dark themes.
- 🧵 **Responsive UI** – Interactive and clean layout for all devices.

---

## 🛠 Tech Stack

| Layer         | Tools & Libraries                       |
|-------------- |------------------------------------------|
| Frontend      | React.js, Chart.js, CSS3                 |
| Backend       | Flask, Transformers, NLTK, VADER         |
| APIs          | Twitter API v2                           |
| Extras        | CSV Export, Dark Mode, Pie Chart, Summary |

---
## 📦 Folder Structure

Sentiment-Monitor/
├── backend/
│ ├── app.py
│ ├── sentiment.py
│ ├── summary.py
│ ├── export.py
│ └── twitter_app.py
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ └── ...
├── .gitignore
├── Dockerfile
├── requirements.txt
└── README.md

Backend Setup (Python)
cd backend
python -m venv venv
venv\Scripts\activate   

pip install -r requirements.txt

Frontend Setup (React)
cd ../frontend
npm install
npm start

Start Backend (Flask API)
cd backend
python app.py

Start Frontend (React)
cd frontend
npm start

Usage Guide
Type a keyword like AI, Elections, or Cricket

Click Analyze Tweets

View:

Tweet Sentiments (Table)

Emoji & Hashtag insights

Pie Chart of sentiments

Summarized overview

Click ⬇ Download CSV to export data

Toggle 🌗 Dark Mode for different theme
